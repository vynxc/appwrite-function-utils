import { Context } from "@vynxc/appwrite-utils";
import { ElysiaAppwrite } from "./elysia";

const elysiahandler = new ElysiaAppwrite();
elysiahandler.app.get("/elysia", ({ logger }) => {
	logger.log("Hello logs from Elysia");
	logger.error("Hello errors from Elysia");
	return "Hello Elysia";
});
export default async function (ctx: Context) {
	return await elysiahandler.handle(ctx);
}
