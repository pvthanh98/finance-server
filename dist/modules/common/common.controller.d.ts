import { CommonService } from './common.service';
export declare class CommonController {
    private commonService;
    constructor(commonService: CommonService);
    pingServer(): Promise<string>;
    getLog(): Promise<import("../../entities/log.entity").Log[]>;
}
