import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCostsDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly date: Date;

  @IsOptional()
  readonly userId: ObjectId;
}
