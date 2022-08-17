import {
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardStatus } from './models/board-status.enum';
import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  /*
   * 게시글 목록
   */
  async getAllBoards(): Promise<Board[]> {
    const boards = await this.boardModel.find().lean();

    if (!boards) {
      throw new NotFoundException('게시글이 없습니다.');
    }

    return boards;
  }

  /*
   * 게시글 읽기
   */
  async getBoardById(boardId: string): Promise<Board> {
    const board = await this.boardModel.findById(boardId).lean();

    if (!board) {
      throw new NotFoundException(`${boardId} 번 게시글을 찾을 수 없습니다.`);
    }

    return board;
  }

  /*
   * 게시글 쓰기
   */
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { user, title, description } = createBoardDto;
    const board = await this.boardModel.create({
      user,
      title,
      description,
      regdate: new Date(),
      status: BoardStatus.PUBLIC,
    });

    if (!board) {
      throw new InternalServerErrorException('글쓰기 실패');
    }

    return board;
  }

  /*
   * 게시글 삭제
   */
  async deleteBoard(boardId: string): Promise<Board> {
    const result = await this.boardModel.findByIdAndRemove(boardId);

    return result;
  }

  /*
   * 게시글 수정
   */
  async updateBoard(
    boardId: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.boardModel.findByIdAndUpdate(
      boardId,
      updateBoardDto,
    );

    return board;
  }
}
