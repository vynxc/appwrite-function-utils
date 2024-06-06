"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treaty = void 0;
const eden_1 = require("@elysiajs/eden");
const client_1 = require("./client");
function treaty(functions, functionId, config) {
    return (0, eden_1.treaty)("https://appwrite.io", Object.assign({ fetcher(input, init) {
            return (0, client_1.client)(functions, functionId, input, init);
        } }, config));
}
exports.treaty = treaty;
