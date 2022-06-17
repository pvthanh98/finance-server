import { Request } from 'express';
import { CommonService } from './common.service';
export declare class CommonController {
    private commonService;
    constructor(commonService: CommonService);
    pingServer(req: Request): Promise<string>;
    getLog(): Promise<import("../../entities/log.entity").Log[]>;
}
