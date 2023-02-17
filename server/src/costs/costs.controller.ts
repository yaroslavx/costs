import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { CostsServie } from 'src/costs/costs.servie';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class CostsController {
  constructor(
    private readonly costsService: CostsServie,
    private readonly authService: AuthService,
  ) {}

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async getAllCosts(@Req() req, @Res() res) {}
}
