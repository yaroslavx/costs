import {
  Body,
  Controller,
  HttpStatus,
  Res,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginGuard } from 'src/auth/guards/login.guard';
import { AuthService } from 'src/auth/auth.service';
import { RefreshJWTGuard } from 'src/auth/guards/refresh-jwt.guard';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.login(loginUserDto);
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user._id);
    res.statusCode = HttpStatus.OK;
    return res.send({
      ...accessToken,
      ...refreshToken,
      username: user.username,
    });
  }

  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.registration(createUserDto);
    res.statusCode = HttpStatus.CREATED;
    return res.send('User created');
  }

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const validToken = await this.authService.verifyToken(
      refreshTokenDto.refresh_token,
    );
    const user = await this.userService.findOne(refreshTokenDto.username);
    const accessToken = await this.authService.generateAccessToken(user);

    if (validToken.error) {
      if (validToken.error === 'jwt expired') {
        const refreshToken = await this.authService.generateRefreshToken(
          user._id,
        );
        res.statusCode = HttpStatus.OK;
        return res.send({ ...accessToken, ...refreshToken });
      } else {
        res.statusCode = HttpStatus.BAD_REQUEST;
        return res.send({ error: validToken.error });
      }
    } else {
      res.statusCode = HttpStatus.OK;
      return res.send({
        ...accessToken,
        refresh_token: refreshTokenDto.refresh_token,
      });
    }
  }
}
