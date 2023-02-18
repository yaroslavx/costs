import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cost, CostsSchema } from 'src/schemas/costs.schema';
import { CostsService } from 'src/costs/costs.service';
import { CostsController } from 'src/costs/costs.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cost.name,
        schema: CostsSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [CostsController],
  providers: [CostsService],
})
export class CostsModule {}
