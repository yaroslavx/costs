import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CostsDocument = Cost & Document;

@Schema()
export class Cost {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, defeult: new Date() })
  date: Date;

  @Prop({ required: true, defeult: '1' })
  userId: ObjectId;
}

export const CostsSchema = SchemaFactory.createForClass(Cost);
