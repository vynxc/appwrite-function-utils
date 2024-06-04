import { Context, Response } from "../types";

export class AppwriteEventHandler {
	private listeners: {
		[eventName: string]: ((
			eventData: string | object,
			context: Context
		) => Promise<Response | void>)[];
	} = {};

	on(
		eventName: string,
		callback: (
			eventData: string | object,
			context: Context
		) => Promise<Response | void>
	): void {
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName.toLowerCase()].push(callback);
	}
	off(eventName: string): void {
		delete this.listeners[eventName];
	}

	async pipe(context: Context): Promise<Response | void> {
		const eventName = context.req.headers["x-appwrite-event"];
		if (!eventName) return;

		const eventData = context.req.body;

		if (this.listeners[eventName]) {
			for (const listener of this.listeners[eventName]) {
				try {
					const response = await listener(eventData, context);
					if (response) {
						return response;
					}
				} catch (error) {
					const message = error instanceof Error ? error.message : null;
					context.error(
						`Error handling event "${eventName}":${message ?? "Unavailable"}`
					);
				}
			}
		}
	}
}
