import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  token: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
