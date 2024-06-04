import { Context, AppwriteEventHandler } from "@vynxc/appwrite-utils";
const eventHandler = new AppwriteEventHandler();
eventHandler.on("databases.*", async (eventData, context) => {
	context.log("Database event received");
});
export default async function (context: Context) {
	const resposne = await eventHandler.pipe(context);
	if (resposne) return resposne;

	return context.res.json({ message: "Hello, world!" });
}
