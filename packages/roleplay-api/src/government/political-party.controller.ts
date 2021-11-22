import Moment from 'moment';
import {GetSession, HasSession} from '@instinct-api/session';
import {PoliticalPartyPipe} from './political-party.pipe';
import {RPUserEntityStruct} from '../database/user/user.types';
import {PoliticalPartyService} from './political-party.service';
import {HasRPScope} from '../session/permission-scope.decorator';
import {PoliticalPartyDTOImplementation} from './political-party.dto';
import {PoliticalParty, RPUser} from '@instinct-plugin/roleplay-types';
import {politicalPartyWire} from '../database/political-party/political-party.wire';
import {PoliticalPartyEntity} from '../database/political-party/political-party.entity';
import {PoliticalPartyRepository} from '../database/political-party/political-party.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {PoliticalPartyMemberRepository} from '../database/political-party/political-party-member.repository';

@Controller('political-parties')
@HasSession()
export class PoliticalPartyController {
  constructor(
    private readonly politicalPartyRepo: PoliticalPartyRepository,
    private readonly politicalPartyService: PoliticalPartyService,
    private readonly politicalPartyMemberRepo: PoliticalPartyMemberRepository
  ) {}

  @Get()
  async getPoliticalParties(): Promise<PoliticalParty[]> {
    const politicalParties = await this.politicalPartyRepo.find(
      {},
      {id: 'DESC'}
    );

    const politicalPartyMembers: Array<RPUser[]> = [];

    for (const politicalParty of politicalParties) {
      const corpMembers =
        await this.politicalPartyService.getUsersForPoliticalParty(
          politicalParty
        );
      politicalPartyMembers.push(corpMembers);
    }

    return politicalParties.map((politicalParty, index) =>
      politicalPartyWire(politicalParty, politicalPartyMembers[index])
    );
  }

  @Post()
  @HasRPScope('websiteRegisterPoliticalParty')
  async createPoliticalParty(
    @Body() politicalPartyDTO: PoliticalPartyDTOImplementation,
    @GetSession() session: RPUserEntityStruct
  ): Promise<PoliticalParty> {
    const newPoliticalParty = await this.politicalPartyRepo.create({
      ...politicalPartyDTO,
      userID: session.id!,
      createdAt: Moment().unix(),
      updatedAt: Moment().unix(),
    });

    await this.politicalPartyMemberRepo.create({
      politicalPartyID: newPoliticalParty.id!,
      userID: session.id!,
      isAdmin: false,
    });

    const politicalPartyMembers =
      await this.politicalPartyService.getUsersForPoliticalParty(
        newPoliticalParty
      );

    return politicalPartyWire(newPoliticalParty, politicalPartyMembers);
  }

  @Get(':politicalPartyID')
  async getPoliticalPartyByID(
    @Param('politicalPartyID', PoliticalPartyPipe)
    politicalParty: PoliticalPartyEntity
  ): Promise<PoliticalParty> {
    const politicalPartyMembers =
      await this.politicalPartyService.getUsersForPoliticalParty(
        politicalParty
      );
    return politicalPartyWire(politicalParty, politicalPartyMembers);
  }

  @Patch(':politicalPartyID')
  @HasRPScope('websiteRegisterPoliticalParty')
  async updatePoliticalParty(
    @Body() politicalPartyDTO: PoliticalPartyDTOImplementation,
    @Param('politicalPartyID', PoliticalPartyPipe)
    politicalParty: PoliticalPartyEntity,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    if (politicalParty.userID !== session.id!) {
      throw new UnauthorizedException();
    }

    await this.politicalPartyRepo.update(
      {id: politicalParty.id!},
      {...politicalPartyDTO, updatedAt: Moment().unix()}
    );
  }

  @Delete(':politicalPartyID')
  @HasRPScope('websiteRegisterPoliticalParty')
  async deletePoliticalParty(
    @Param('politicalPartyID', PoliticalPartyPipe)
    politicalParty: PoliticalPartyEntity,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    if (politicalParty.userID !== session.id!) {
      throw new UnauthorizedException();
    }

    await this.politicalPartyRepo.delete({id: politicalParty.id!});
  }

  @Post(':politicalPartyID/membership')
  async joinPoliticalParty(
    @Param('politicalPartyID', PoliticalPartyPipe)
    politicalParty: PoliticalPartyEntity,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    const existingMembership = await this.politicalPartyMemberRepo.findOne({
      userID: session.id!,
    });

    if (existingMembership) {
      await this.politicalPartyMemberRepo.update(
        {id: existingMembership.id!},
        {politicalPartyID: politicalParty.id!, isAdmin: false}
      );
      return;
    }

    await this.politicalPartyMemberRepo.create({
      userID: session.id!,
      politicalPartyID: politicalParty.id!,
      isAdmin: false,
    });
  }

  @Delete(':politicalPartyID/membership')
  async leavePoliticalParty(
    @Param('politicalPartyID', PoliticalPartyPipe)
    politicalParty: PoliticalPartyEntity,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    await this.politicalPartyMemberRepo.delete({
      userID: session.id!,
      politicalPartyID: politicalParty.id!,
    });
  }
}
