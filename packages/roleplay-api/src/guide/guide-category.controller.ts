import {GuideCategory, GuideCategoryDTO} from '@instinct-plugin/roleplay-types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {GuideCategoryRepository} from '../database/guide/guide-category.repository';
import {guideCategoryWire} from '../database/guide/guide-category.wire';
import {GuideCategoryPipe} from './guide-category.pipe';
import {HasRPScope} from '../session/permission-scope.decorator';
import {GuideCategoryEntity} from '../database/guide/guide-category.entity';

@Controller('guides/categories')
export class GuideCategoryController {
  constructor(private readonly guideCategoryRepo: GuideCategoryRepository) {}

  @Get()
  async getAllGuideCategories(): Promise<GuideCategory[]> {
    const guideCategories = await this.guideCategoryRepo.find({}, {id: 'DESC'});
    return guideCategories.map(guideCategoryWire);
  }

  @Post()
  @HasRPScope('websiteCreateGuideCategories')
  async createGuide(
    @Body() guideCategoryDTO: GuideCategoryDTO
  ): Promise<GuideCategory> {
    const newGuide = await this.guideCategoryRepo.create(guideCategoryDTO);
    return guideCategoryWire(newGuide);
  }

  @Get(':guideCategoryID')
  getGuideByID(
    @Param('guideCategoryID', GuideCategoryPipe)
    guideCategory: GuideCategoryEntity
  ): GuideCategory {
    return guideCategoryWire(guideCategory);
  }

  @Patch(':guideCategoryID')
  @HasRPScope('websiteCreateGuideCategories')
  async updateGuideByID(
    @Param('guideCategoryID', GuideCategoryPipe)
    guideCategory: GuideCategoryEntity,
    @Body() guideCategoryDTO: GuideCategoryDTO
  ) {
    await this.guideCategoryRepo.update(
      {id: guideCategory.id!},
      guideCategoryDTO
    );
  }

  @Delete(':guideCategoryID')
  @HasRPScope('websiteDeleteGuideCategories')
  async deleteGuideByID(
    @Param('guideCategoryID', GuideCategoryPipe)
    guideCategory: GuideCategoryEntity
  ) {
    await this.guideCategoryRepo.delete({id: guideCategory.id!});
  }
}
