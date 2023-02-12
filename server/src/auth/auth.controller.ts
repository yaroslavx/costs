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

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

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
