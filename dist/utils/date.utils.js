"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(dateString, format = 'dd-mm-yyyy') {
    const dateNow = new Date(dateString);
    const date = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    const dateFormat = date > 10 ? date : `0${date}`;
    const monthFormat = month > 10 ? month : `0${month}`;
    return format.replace('dd', `${dateFormat}`).replace('mm', `${monthFormat}`).replace('yyyy', `${year}`);
}
exports.formatDate = formatDate;
//# sourceMappingURL=date.utils.js.map