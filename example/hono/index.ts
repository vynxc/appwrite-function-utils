import { Hono } from "hono";
import {
	Context,
	Response as Resp,
	toResponse,
	toRequest,
} from "@vynxc/appwrite-utils";

export class HonoAppwrite {
	public app = new Hono();

	public handle = async (ctx: Context): Promise<Resp> => {
		const resp = await this.app.fetch(toRequest(ctx.req));
		return toResponse(resp);
	};
}
