import { Hono } from "hono";
import { Response as Resp, toResponse } from "@vynxc/appwrite-utils";

export class HonoAppwrite {
	public hono: Hono;
	constructor() {
		this.hono = new Hono();
	}
	public handle = async (request: Request): Promise<Resp> => {
		const resp = await this.hono.fetch(request);
		return toResponse(resp);
	};
}
