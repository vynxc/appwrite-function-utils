import { Request as Req, Response as Res } from "../types";
export function toRequest(request: Req): Request {
	const init: RequestInit = {
		method: request.method,
		headers: request.headers,
		body: request.bodyRaw,
	};
	return new Request(new URL(request.url), init);
}

export async function toResponse(response: Response): Promise<Res> {
	const body = await response.text();
	const headers = Object.fromEntries(response.headers.entries());

	return {
		statusCode: response.status,
		headers,
		body,
	};
}
