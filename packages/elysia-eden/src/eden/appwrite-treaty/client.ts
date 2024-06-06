import { ExecutionMethod, Functions } from "appwrite";
import { convertBodyToString } from "elysia-eden/src/utils";

export async function client(
	functions: Functions,
	id: string,
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> {
	let url: URL;
	if (typeof input === "string") {
		url = new URL(input);
	} else {
		url = input as URL;
	}

	const path = url.pathname + url.search + url.hash;
	const method = (init?.method ?? "GET") as ExecutionMethod;
	let body: string | undefined = undefined;
	if (init?.body) {
		body = await convertBodyToString(init?.body);
	}
	const headers = init?.headers;

	const execution = await functions.createExecution(
		id,
		body,
		false,
		path,
		method,
		headers
	);

	const resHeaders: Record<string, string> = {};
	execution.responseHeaders.forEach((header) => {
		resHeaders[header.name] = header.value;
	});
	const response = new Response(execution.responseBody, {
		headers: resHeaders,
		status: execution.responseStatusCode,
		statusText: execution.responseStatusCode.toString(),
	});
	return response;
}
