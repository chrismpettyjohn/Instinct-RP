import Moment from 'moment';
import {GuidePipe} from './guide,pipe';
import {GetSession, HasSession} from '@instinct-api/session';
import {RPUserService} from '../user/user.service';
import {rpUserWire} from '../database/user/user.wire';
import {guideWire} from '../database/guide/guide.wire';
import {GuideEntity} from '../database/guide/guide.entity';
import {RPUserEntityStruct} from '../database/user/user.types';
import {Guide, GuideDTO, GuideReaction} from '@instinct-plugin/roleplay-types';
import {HasRPScope} from '../session/permission-scope.decorator';
import {GuideRepository} from '../database/guide/guide.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import {GuideReactionRepository} from '../database/guide/guide-reaction.repository';
import {GuideReactionEntity} from '../database/guide/guide-reaction.entity';

@Controller('guides')
@HasSession()
export class GuideController {
  constructor(
    private readonly guideRepo: GuideRepository,
    private readonly rpUserService: RPUserService,
    private readonly guideReactionRepo: GuideReactionRepository
  ) {}

  @Get()
  async getAllGuides() {
    const guides = await this.guideRepo.find({}, {id: 'DESC'});
    const guideOwnerRPStats = await Promise.all(
      guides.map(_ => this.rpUserService.getRPStatsForUser(_.user!))
    );
    return guides.map((guide: GuideEntity, index: number) =>
      guideWire(guide, rpUserWire(guide.user!, guideOwnerRPStats[index]))
    );
  }

  @Post()
  @HasRPScope('websiteCreateGuides')
  async createGuide(
    @Body() guideDTO: GuideDTO,
    @GetSession() session: RPUserEntityStruct
  ): Promise<Guide> {
    const newGuide = await this.guideRepo.create({
      ...guideDTO,
      userID: session.id!,
      createdAt: Moment().unix(),
      updatedAt: Moment().unix(),
    });

    const rpStats = await this.rpUserService.getRPStatsForUser(session);

    return guideWire(newGuide, rpUserWire(session, rpStats));
  }

  @Get(':guideID')
  async getGuideByID(
    @Param('guideID', GuidePipe) guide: GuideEntity
  ): Promise<Guide> {
    const rpStats = await this.rpUserService.getRPStatsForUser(guide.user!);
    return guideWire(guide, rpUserWire(guide.user!, rpStats));
  }

  @Patch(':guideID')
  async updateGuideByID(
    @Param('guideID', GuidePipe) guide: GuideEntity,
    @Body() guideDTO: GuideDTO,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    if (guide.userID !== session.id!) {
      throw new UnauthorizedException();
    }

    await this.guideRepo.update({id: guide.id!}, guideDTO);
  }

  @Delete(':guideID')
  async deleteGuideByID(
    @Param('guideID', GuidePipe) guide: GuideEntity,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    if (guide.userID !== session.id!) {
      throw new UnauthorizedException();
    }

    await this.guideRepo.delete({id: guide.id!});
  }

  @Put(':guideID/reactions/like')
  async likeGuideByID(
    @Param('guideID', GuidePipe) guide: GuideEntity,
    @GetSession() session: RPUserEntityStruct
  ) {
    const existingReaction: GuideReactionEntity | undefined =
      await this.guideReactionRepo.findOne({
        guideID: guide.id!,
        userID: session.id!,
      });

    if (existingReaction) {
      await this.guideReactionRepo.update(
        {id: existingReaction.id!},
        {reaction: GuideReaction.Like}
      );
      return;
    }

    await this.guideReactionRepo.create({
      guideID: guide.id!,
      userID: session.id!,
      reaction: GuideReaction.Like,
    });
  }

  @Put(':guideID/reactions/dislike')
  async dislikeGuideByID(
    @Param('guideID', GuidePipe) guide: GuideEntity,
    @GetSession() session: RPUserEntityStruct
  ) {
    const existingReaction: GuideReactionEntity | undefined =
      await this.guideReactionRepo.findOne({
        guideID: guide.id!,
        userID: session.id!,
      });

    if (existingReaction) {
      await this.guideReactionRepo.update(
        {id: existingReaction.id!},
        {reaction: GuideReaction.Dislike}
      );
      return;
    }

    await this.guideReactionRepo.create({
      guideID: guide.id!,
      userID: session.id!,
      reaction: GuideReaction.Dislike,
    });
  }
}
