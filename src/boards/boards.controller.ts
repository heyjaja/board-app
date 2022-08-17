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
import { ObjectId } from 'mongoose';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './schemas/board.schema';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  async getAllboards(): Promise<Board[]> {
    const boards = await this.boardService.getAllBoards();

    return boards;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardService.createBoard(createBoardDto);
    return board;
  }

  @Get(':id')
  async getBoardById(@Param('id') boardId: string): Promise<Board> {
    const board = await this.boardService.getBoardById(boardId);
    return board;
  }

  @Delete(':id')
  async deleteBoard(@Param('id') boardId: string): Promise<Board> {
    const result = await this.boardService.deleteBoard(boardId);

    return result;
  }

  @Patch(':id')
  async updateBoard(
    @Param('id') boardId: string,
    @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const result = await this.boardService.updateBoard(boardId, updateBoardDto);

    return result;
  }
}
