import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { BoardStatus } from '../models/board-status.enum';

@Schema()
export class Board {
  @Prop({ ref: 'User', required: true })
  user: User;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  regdate: Date;

  @Prop()
  status: BoardStatus;
}

export type BoardDocument = Board & Document;
export const BoardSchema = SchemaFactory.createForClass(Board);
