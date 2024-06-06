import { Functions } from "appwrite";
import { treaty as edenTreaty } from "@elysiajs/eden";
import { type Elysia } from "elysia";
export declare function treaty<const App extends Elysia<any, any, any, any, any, any, any, any>>(functions: Functions, functionId: string, config?: Omit<Parameters<typeof edenTreaty>[1], "fetcher">): ReturnType<typeof edenTreaty<App>>;
