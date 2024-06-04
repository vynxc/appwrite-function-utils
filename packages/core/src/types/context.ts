export type Request = {
	/** Raw request body, contains request data */
	bodyRaw: string;
	/** Object from parsed JSON request body, otherwise string */
	body: string | object;
	/** String key-value pairs of all request headers, keys are lowercase */
	headers: Record<string, string>;
	/** Value of the x-forwarded-proto header, usually http or https */
	scheme: string;
	/** Request method, such as GET, POST, PUT, DELETE, PATCH, etc. */
	method: string;
	/** Full URL, for example: http://awesome.appwrite.io:8000/v1/hooks?limit=12&offset=50 */
	url: string;
	/** Hostname from the host header, such as awesome.appwrite.io */
	host: string;
	/** Port from the host header, for example 8000 */
	port: number;
	/** Path part of URL, for example /v1/hooks */
	path: string;
	/** Raw query params string. For example "limit=12&offset=50" */
	queryString: string;
	/** Parsed query params. For example, req.query.limit */
	query: Record<string, string>;
};

export type Response = {
	body: string;
	statusCode: number;
	headers: Record<string, string>;
};

export type ResponseBuilder = {
	/** Construct an empty response (204 No Content) */
	empty(): Response;
	/** Construct a JSON response */
	json(
		obj: object,
		statusCode?: number,
		headers?: Record<string, string>
	): Response;
	/** Construct a redirect response */
	redirect(
		url: string,
		statusCode?: number,
		headers?: Record<string, string>
	): Response;
	/** Construct a response with a string body */
	send(
		body: string,
		statusCode?: number,
		headers?: Record<string, string>
	): Response;
};

export type Context = {
	/** Request from the client */
	req: Request;
	/** Helper object to construct response objects */
	res: ResponseBuilder;
	/** Log a message to the server console */
	log: (message: Object | any[] | string | number) => void;
	/** Log an error to the server console */
	error: (message: Object | any[] | string | number) => void;
};
