import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User } from '../schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string): Promise<User | null> {
    const user = await this.userService.findOne(username);

    if (!user) return null;
    return user;
  }
}
