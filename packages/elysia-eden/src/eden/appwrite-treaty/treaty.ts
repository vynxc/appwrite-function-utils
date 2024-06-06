import { Functions } from "appwrite";
import { treaty as edenTreaty } from "@elysiajs/eden";
import { client } from "./client";
import { type Elysia } from "elysia";

export function treaty<
	const App extends Elysia<any, any, any, any, any, any, any, any>
>(
	functions: Functions,
	functionId: string,
	config?: Omit<Parameters<typeof edenTreaty>[1], "fetcher">
): ReturnType<typeof edenTreaty<App>> {
	return edenTreaty<App>("https://appwrite.io", {
		fetcher(input, init) {
			return client(functions, functionId, input, init);
		},
		...config,
	});
}
