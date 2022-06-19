import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { PaginationConstant } from 'src/constants/common.constant';
import { PaginationQueryType } from 'src/types/common.type';

@Injectable()
export class PaginationQueryPipe implements PipeTransform {
  transform(value: PaginationQueryType, metadata: ArgumentMetadata) {
    let limit = PaginationConstant.DEFAULT_LIMIT;
    let page = PaginationConstant.DEFAULT_PAGE;
    if (value.page && !isNaN(value.page)) {
      page = Number(value.page);
    }
    if (value.limit && !isNaN(value.limit)) {
      limit = Number(value.limit);
    }
    return {
      ...value,
      page, limit
    }
  }
}