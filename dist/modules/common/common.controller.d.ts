import { Request } from 'express';
import { PaginationQueryType } from 'src/types/common.type';
import { CommonService } from './common.service';
export declare class CommonController {
    private commonService;
    constructor(commonService: CommonService);
    pingServer(req: Request): Promise<string>;
    getLog(query: PaginationQueryType): Promise<{
        currentPage: number;
        recordPerPage: number;
        totalPage: number;
        result: any[];
    }>;
}
