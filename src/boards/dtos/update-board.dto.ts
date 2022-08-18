import { PartialType } from '@nestjs/mapped-types';
import { BoardStatus } from '../models/board-status.enum';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  status: BoardStatus;
}
