import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
