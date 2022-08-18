import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
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
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = await this.boardModel.create({
      title,
      description,
      regdate: new Date(),
      status: BoardStatus.PUBLIC,
      user,
    });

    if (!board) {
      throw new InternalServerErrorException('글쓰기 실패');
    }

    return board;
  }

  /*
   * 게시글 삭제
   */
  async deleteBoard(boardId: string, user: User): Promise<Board> {
    const result = await this.boardModel
      .findByIdAndRemove(boardId)
      .where('user.email')
      .equals(user.email);

    if (!result) {
      throw new UnauthorizedException('삭제 권한이 없습니다.');
    }

    return result;
  }

  /*
   * 게시글 수정
   */
  async updateBoard(
    boardId: string,
    updateBoardDto: UpdateBoardDto,
    user: User,
  ): Promise<Board> {
    const board = await this.boardModel
      .findByIdAndUpdate(boardId, updateBoardDto)
      .where('user.email')
      .equals(user.email);

    if (!board) {
      throw new UnauthorizedException('수정 권한이 없습니다.');
    }

    return board;
  }

  /*
   * 유저의 모든 게시물 가져오기
   */
  async getAllBoardsByUser(user: User): Promise<Board[]> {
    const { email } = user;
    const boards = await this.boardModel
      .find()
      .where('user.email')
      .equals(email);

    return boards;
  }
}
