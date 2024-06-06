"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const utils_1 = require("elysia-eden/src/utils");
function client(functions, id, input, init) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let url;
        if (typeof input === "string") {
            url = new URL(input);
        }
        else {
            url = input;
        }
        const path = url.pathname + url.search + url.hash;
        const method = ((_a = init === null || init === void 0 ? void 0 : init.method) !== null && _a !== void 0 ? _a : "GET");
        let body = undefined;
        if (init === null || init === void 0 ? void 0 : init.body) {
            body = yield (0, utils_1.convertBodyToString)(init === null || init === void 0 ? void 0 : init.body);
        }
        const headers = init === null || init === void 0 ? void 0 : init.headers;
        const execution = yield functions.createExecution(id, body, false, path, method, headers);
        const resHeaders = {};
        execution.responseHeaders.forEach((header) => {
            resHeaders[header.name] = header.value;
        });
        const response = new Response(execution.responseBody, {
            headers: resHeaders,
            status: execution.responseStatusCode,
            statusText: execution.responseStatusCode.toString(),
        });
        return response;
    });
}
exports.client = client;
