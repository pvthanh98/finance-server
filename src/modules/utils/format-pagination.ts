import { PaginationConstant } from "src/constants/common.constant";
import { FormatPaginationType, PaginationQueryType } from "src/types/common.type";


export function FormatPaginationQuery(query: PaginationQueryType): FormatPaginationType {
    const { 
        page : queryPage = PaginationConstant.DEFAULT_PAGE, 
        limit: queryLimit = PaginationConstant.DEFAULT_LIMIT 
    } = query;

    try {
        const page = Number(queryPage);
        const limit = Number(queryLimit);
        const offset = (page - 1) * limit;
        return {
            page,
            limit,
            offset: offset < 0 ? 0 : offset
        }
    } catch (e) {
        return {
            page: PaginationConstant.DEFAULT_PAGE,
            limit: PaginationConstant.DEFAULT_LIMIT,
            offset: PaginationConstant.DEFAULT_OFFSET,
        }
    }
}

export function formatPaginationResponse(results: [any[], number], paginationQuery: FormatPaginationType) {
    const { page, limit } = paginationQuery;
    return {
        currentPage: page,
        recordPerPage: results[0].length,
        totalPage: Math.ceil(results[1] / limit),
        result: results[0],
    };
}