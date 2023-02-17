import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cost, CostsDocument } from 'src/schemas/costs.schema';
import { Model } from 'mongoose';
import { CreateCostsDto } from 'src/costs/dto/create-costs.dto';
import { UpdateCostsDto } from 'src/costs/dto/update-costs.dto';

@Injectable()
export class CostsServie {
  constructor(
    @InjectModel(Cost.name) private costsModel: Model<CostsDocument>,
  ) {}

  async findAll(): Promise<Cost[]> {
    return this.costsModel.find();
  }

  async findOne(id: string): Promise<Cost> {
    return this.costsModel.findOne({ _id: id });
  }

  async create(createCostDto: CreateCostsDto): Promise<Cost> {
    const createdCost = new this.costsModel(createCostDto);
    return createdCost.save();
  }

  async update(updateCostDto: UpdateCostsDto, id: string): Promise<Cost> {
    await this.costsModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...updateCostDto,
        },
      },
    );
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    this.costsModel.deleteOne({ _id: id });
  }
}
