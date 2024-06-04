import { Elysia } from "elysia";
import {
	Context,
	Response as Resp,
	toResponse,
	toRequest,
} from "@vynxc/appwrite-utils";
import { ILogger } from "../types";

export class ElysiaAppwrite {
	private logger: ILogger | undefined = undefined;
	public app = new Elysia().decorate(
		"logger",
		this.logger as unknown as ILogger
	);
	public handle = async (ctx: Context): Promise<Resp> => {
		this.logger = {
			error: ctx.error,
			log: ctx.log,
		};
		this.app.decorate("logger", this.logger);
		const resp = await this.app.handle(toRequest(ctx.req));
		return await toResponse(resp);
	};
}
