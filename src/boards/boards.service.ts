import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { Board, BoardStatus } from './models/board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const board = {
      id: String(this.boards.length + 1),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(boardId: string): Board {
    const board = this.boards.find((board) => board.id === boardId);
    if (!board) {
      throw new NotFoundException(`${boardId} 번 게시글을 찾을 수 없습니다.`);
    }
    return board;
  }

  deleteBoard(boardId: string): void {
    const foundBoard = this.getBoardById(boardId);
    this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  }

  updateBoard(boardId: string, updateBoard: UpdateBoardDto): Board {
    const board = this.getBoardById(boardId);
    Object.assign(board, updateBoard);
    return board;
  }
}
