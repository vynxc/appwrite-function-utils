export interface ILogger {
	log: (message: Object | any[] | string | number) => void;
	error: (message: Object | any[] | string | number) => void;
}
