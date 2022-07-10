"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = void 0;
function isExpired(date, expireInSecond) {
    const dateNow = new Date();
    const date1 = new Date(date);
    const miliseconds = dateNow - date1;
    const seconds = miliseconds / 1000;
    return seconds > expireInSecond;
}
exports.isExpired = isExpired;
//# sourceMappingURL=time.util.js.map