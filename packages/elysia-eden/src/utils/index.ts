export async function convertBodyToString(body: BodyInit): Promise<string> {
	if (typeof body === "string") {
		return body;
	} else if (body instanceof Blob) {
		return await body.text();
	} else if (body instanceof FormData) {
		return new URLSearchParams(body as any).toString();
	} else if (body instanceof URLSearchParams) {
		return body.toString();
	} else {
		// Handle other types of BodyInit if needed
		throw new Error("Unsupported body type");
	}
}
