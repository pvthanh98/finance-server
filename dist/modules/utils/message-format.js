"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatMessageOwner = void 0;
const FormatMessageOwner = (messages, userId) => {
    return messages.map(msg => {
        const { fromUser } = msg, otherAttr = __rest(msg, ["fromUser"]);
        return Object.assign(Object.assign({}, otherAttr), { fromUser: Object.assign(Object.assign({}, fromUser), { isMe: fromUser.id === userId }) });
    });
};
exports.FormatMessageOwner = FormatMessageOwner;
//# sourceMappingURL=message-format.js.map