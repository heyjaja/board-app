import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../models/board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any) {
    value.status = value.status.toUpperCase();

    if (!this.isStatusValid(value.status)) {
      throw new BadRequestException(
        `${value.status} isn't in the status options`,
      );
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
