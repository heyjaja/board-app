import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BoardStatus } from '../models/board-status.enum';

@Schema()
export class Board {
  @Prop()
  user: string;

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
