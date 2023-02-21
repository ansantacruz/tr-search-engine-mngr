"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugUtilities = exports.MessageError = void 0;
const http_status_1 = __importDefault(require("http-status"));
exports.MessageError = 'ERROR: %j';
class DebugUtilities {
    static getMessage(reason) {
        if (reason instanceof Error) {
            return reason.message;
        }
        else {
            return reason;
        }
    }
    static error(error, typeError, uuid) {
        const descError = error.Reason === undefined ?
            error : error.Reason;
        const codeError = error.CodeError === undefined ?
            '000-0' : error.CodeError.toString();
        const codeStatusError = error.StatusCode === undefined ?
            500 : error.StatusCode;
        //@ts-ignore
        const descStatusError = http_status_1.default[codeStatusError].toString();
        const statusError = {
            EndDt: new Date().toISOString(),
            Status: {
                CodeError: codeError,
                ServerStatusCode: descStatusError,
                Severity: typeError,
                StatusCode: codeStatusError,
                StatusDesc: descError
            }
        };
        return { statusError, codeStatusError, uuid };
    }
}
exports.DebugUtilities = DebugUtilities;
//# sourceMappingURL=DebugUtilities.js.map