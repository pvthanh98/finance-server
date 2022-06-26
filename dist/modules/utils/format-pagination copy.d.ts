import { FormatPaginationType, PaginationQueryType } from "src/types/common.type";
export declare function FormatPaginationQuery(query: PaginationQueryType): FormatPaginationType;
export declare function formatPaginationResponse(results: [any[], number], paginationQuery: FormatPaginationType): {
    currentPage: number;
    recordPerPage: number;
    totalPage: number;
    result: any[];
};
