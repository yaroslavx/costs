import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.userModel.collection.findOne({
      username: createUserDto.username,
    });

    if (existingUser) {
      return null;
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({
      username,
    });
  }
}
