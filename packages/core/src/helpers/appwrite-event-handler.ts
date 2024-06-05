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
		const normalizedEventName = eventName.toLowerCase();
		if (!this.listeners[normalizedEventName]) {
			this.listeners[normalizedEventName] = [];
		}
		this.listeners[normalizedEventName].push(callback);
	}

	off(eventName: string): void {
		const normalizedEventName = eventName.toLowerCase();
		delete this.listeners[normalizedEventName];
	}

	async pipe(context: Context): Promise<Response | void> {
		const eventName = context.req.headers["x-appwrite-event"];
		if (!eventName) return;

		const eventData = context.req.body;

		const matchingListeners = this.getMatchingListeners(
			eventName.toLowerCase()
		);
		for (const listener of matchingListeners) {
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

	private getMatchingListeners(
		eventName: string
	): ((
		eventData: string | object,
		context: Context
	) => Promise<Response | void>)[] {
		const matchingListeners: ((
			eventData: string | object,
			context: Context
		) => Promise<Response | void>)[] = [];

		for (const pattern in this.listeners) {
			if (this.matchesPattern(eventName, pattern)) {
				matchingListeners.push(...this.listeners[pattern]);
			}
		}

		return matchingListeners;
	}

	/**
	 * Checks if an event name matches a given pattern with support for wildcards.
	 *
	 * @param eventName - The event name to be matched, e.g., "databases.6651e90b0039e129bbf1.collections.6651e91e00319fb5fab5.documents.6660b8640030cb550838.create".
	 * @param pattern - The pattern to match against, e.g., "databases.*".
	 * @returns `true` if the event name matches the pattern; otherwise, `false`.
	 */
	private matchesPattern(eventName: string, pattern: string): boolean {
		const eventParts = eventName.split(".");
		const patternParts = pattern.split(".");

		// Pattern must be a prefix of the event name
		if (patternParts.length > eventParts.length) {
			return false;
		}

		for (let i = 0; i < patternParts.length; i++) {
			if (patternParts[i] !== "*" && patternParts[i] !== eventParts[i]) {
				return false;
			}
		}

		return true;
	}
}
