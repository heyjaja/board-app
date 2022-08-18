import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './schemas/board.schema';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  async getAllboards(): Promise<Board[]> {
    const boards = await this.boardService.getAllBoards();

    return boards;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() req,
  ): Promise<Board> {
    const board = await this.boardService.createBoard(createBoardDto, req.user);
    return board;
  }

  @Get('user')
  async getAllBoardsByUser(@Req() req): Promise<Board[]> {
    const boards = await this.boardService.getAllBoardsByUser(req.user);

    return boards;
  }

  @Get(':id')
  async getBoardById(@Param('id') boardId: string): Promise<Board> {
    const board = await this.boardService.getBoardById(boardId);
    return board;
  }

  @Delete(':id')
  async deleteBoard(
    @Param('id') boardId: string,
    @Req() req: any,
  ): Promise<Board> {
    const result = await this.boardService.deleteBoard(boardId, req.user);

    return result;
  }

  @Patch(':id')
  async updateBoard(
    @Param('id') boardId: string,
    @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto,
    @Req() req: any,
  ): Promise<Board> {
    const result = await this.boardService.updateBoard(
      boardId,
      updateBoardDto,
      req.user,
    );

    return result;
  }
}
