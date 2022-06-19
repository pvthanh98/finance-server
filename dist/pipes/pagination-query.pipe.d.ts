import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { PaginationConstant } from 'src/constants/common.constant';
import { PaginationQueryType } from 'src/types/common.type';
export declare class PaginationQueryPipe implements PipeTransform {
    transform(value: PaginationQueryType, metadata: ArgumentMetadata): {
        page: PaginationConstant;
        limit: PaginationConstant;
        search?: string;
    };
}
