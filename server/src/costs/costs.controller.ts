import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CostsService } from 'src/costs/costs.service';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { CreateCostsDto } from 'src/costs/dto/create-costs.dto';
import { UpdateCostsDto } from 'src/costs/dto/update-costs.dto';

@Controller('costs')
export class CostsController {
  constructor(
    private readonly costsService: CostsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCosts(@Req() req, @Res() res) {
    const token = req.token;
    const user = await this.authService.getUserByTokenData(token);
    const costs = await this.costsService.findAll();
    const filteredCosts = costs.filter(
      (cost) => cost.userId === user._id.toString(),
    );

    return res.send(filteredCosts);
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createCost(@Body() createCostDto: CreateCostsDto, @Req() req) {
    const user = await this.authService.getUserByTokenData(req.token);

    return await this.costsService.create({
      ...createCostDto,
      userId: user._id,
    });
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateCost(
    @Body() updateCostDto: UpdateCostsDto,
    @Param('id') id: string,
  ) {
    return await this.costsService.update(updateCostDto, id);
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCost(@Param('id') id: string) {
    return await this.costsService.delete(id);
  }
}
