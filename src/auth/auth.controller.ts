import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.authService.createUser(createUserDto);

    return user;
  }

  @Post('signin')
  async signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const result = await this.authService.signIn(createUserDto);

    return result;
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() request) {
    console.log(request.user);
  }
}
