import {
  Body,
  Controller,
  HttpStatus,
  Res,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginGuard } from 'src/auth/guards/login.guard';
import { AuthService } from 'src/auth/auth.service';

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
}
