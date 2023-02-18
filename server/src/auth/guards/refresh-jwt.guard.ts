import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refresh_token, username } = request.body;

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token is required');
    }

    if (!username) {
      throw new UnauthorizedException('User name is required');
    }

    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException("User isn't exist");
    }

    return true;
  }
}
