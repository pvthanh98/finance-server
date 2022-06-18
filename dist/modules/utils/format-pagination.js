"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPaginationResponse = exports.FormatPaginationQuery = void 0;
const common_constant_1 = require("../../constants/common.constant");
function FormatPaginationQuery(query) {
    const { page: queryPage = common_constant_1.PaginationConstant.DEFAULT_PAGE, limit: queryLimit = common_constant_1.PaginationConstant.DEFAULT_LIMIT } = query;
    try {
        const page = Number(queryPage);
        const limit = Number(queryLimit);
        const offset = (page - 1) * limit;
        return {
            page,
            limit,
            offset: offset < 0 ? 0 : offset
        };
    }
    catch (e) {
        return {
            page: common_constant_1.PaginationConstant.DEFAULT_PAGE,
            limit: common_constant_1.PaginationConstant.DEFAULT_LIMIT,
            offset: common_constant_1.PaginationConstant.DEFAULT_OFFSET,
        };
    }
}
exports.FormatPaginationQuery = FormatPaginationQuery;
function formatPaginationResponse(results, paginationQuery) {
    const { page, limit } = paginationQuery;
    return {
        currentPage: page,
        recordPerPage: results[0].length,
        totalPage: Math.ceil(results[1] / limit),
        result: results[0],
    };
}
exports.formatPaginationResponse = formatPaginationResponse;
//# sourceMappingURL=format-pagination.js.map