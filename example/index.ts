import { Context, toRequest, toResponse } from "@vynxc/appwrite-utils";
import Elysia from "elysia";
import { ILogger } from "./types";

let logger: ILogger = {
	error: console.error,
	log: console.log,
};

const app = new Elysia();

app.get("/elysia", () => {
	logger.log("Hello logs from Elysia");
	logger.error("Hello errors from Elysia");
	return "Hello Elysia";
});
export default async function (ctx: Context) {
	logger.log = ctx.log;
	logger.error = ctx.error;

	const resp = await app.handle(toRequest(ctx.req));
	return await toResponse(resp);
}
