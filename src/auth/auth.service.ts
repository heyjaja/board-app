import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /*
   * 유저 생성
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    let createdUser = null;

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(createUserDto.password, salt);

    try {
      // 유저 생성
      createdUser = await this.userModel.create({
        ...createUserDto,
        password: hashed,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('이미 존제하는 email 입니다.');
      } else {
        throw new InternalServerErrorException('회원가입에 실패하였습니다.');
      }
    }

    return createdUser;
  }

  /*
   * 유저 로그인
   */
  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email });
    const passed = await bcrypt.compare(password, user.password);

    if (user && passed) {
      // 유저 토큰 생성(secret + payload)
      const payload = { name: user.name, email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }
}
