import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Authorization error');
    }

    const validToken = this.authService.verifyToken(token);
    if (validToken?.error) {
      throw new UnauthorizedException(validToken.error);
    }

    return (request.token = token);
  }
}
