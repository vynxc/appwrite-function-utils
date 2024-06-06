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
exports.convertBodyToString = void 0;
function convertBodyToString(body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof body === "string") {
            return body;
        }
        else if (body instanceof Blob) {
            return yield body.text();
        }
        else if (body instanceof FormData) {
            return new URLSearchParams(body).toString();
        }
        else if (body instanceof URLSearchParams) {
            return body.toString();
        }
        else {
            // Handle other types of BodyInit if needed
            throw new Error("Unsupported body type");
        }
    });
}
exports.convertBodyToString = convertBodyToString;
