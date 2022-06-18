"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationConstant = exports.LogFrom = exports.LogType = exports.LOG_CONTENT = void 0;
exports.LOG_CONTENT = {
    PING: "Ping count: "
};
var LogType;
(function (LogType) {
    LogType["PING"] = "PING";
    LogType["UNKNOW"] = "UNKNOW";
})(LogType = exports.LogType || (exports.LogType = {}));
var LogFrom;
(function (LogFrom) {
    LogFrom["GUEST"] = "GUEST";
})(LogFrom = exports.LogFrom || (exports.LogFrom = {}));
var PaginationConstant;
(function (PaginationConstant) {
    PaginationConstant[PaginationConstant["DEFAULT_PAGE"] = 1] = "DEFAULT_PAGE";
    PaginationConstant[PaginationConstant["DEFAULT_LIMIT"] = 8] = "DEFAULT_LIMIT";
    PaginationConstant[PaginationConstant["DEFAULT_OFFSET"] = 0] = "DEFAULT_OFFSET";
})(PaginationConstant = exports.PaginationConstant || (exports.PaginationConstant = {}));
//# sourceMappingURL=common.constant.js.map