import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { Board } from './models/board.model';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllboards(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get(':id')
  getBoardById(@Param('id') boardId: string): Board {
    return this.boardService.getBoardById(boardId);
  }

  @Delete(':id')
  deleteBoard(@Param('id') boardId: string): string {
    this.boardService.deleteBoard(boardId);
    return 'success';
  }

  @Patch(':id')
  updateBoard(
    @Param('id') boardId: string,
    @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto,
  ): Board {
    return this.boardService.updateBoard(boardId, updateBoardDto);
  }
}
