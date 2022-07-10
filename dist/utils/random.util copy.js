"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (length = 8) => {
    let chars = '0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
};
exports.random = random;
//# sourceMappingURL=random.util%20copy.js.map