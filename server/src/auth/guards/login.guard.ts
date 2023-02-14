import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    const user = await this.authService.validateUser(username);

    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    if (user.password !== password) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    return true;
  }
}
