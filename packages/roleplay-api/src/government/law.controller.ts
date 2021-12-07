import Moment from 'moment';
import {LawService} from './law.service';
import {
  LawDTOImplementation,
  LawPresidentialDecisionDTOImplementation,
} from './law.dto';
import {lawWire} from '../database/law/law.wire';
import {GetSession, HasSession} from '@instinct-api/session';
import {
  Law,
  LawPresidentialStatus,
  LawStatus,
  LawVoteStatus,
} from '@instinct-plugin/roleplay-types';
import {LawRepository} from '../database/law/law.repository';
import {RPUserEntityStruct} from '../database/user/user.types';
import {HasRPScope} from '../session/permission-scope.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {LawEntity} from '../database/law/law.entity';
import {LawPipe} from './law.pipe';
import {LawVoteRepository} from '../database/law/law-vote.repository';
import {LawVoteDTOImplementation} from '../database/law/law-vote.dto';

@Controller('laws')
@HasSession()
export class LawController {
  constructor(
    private readonly lawRepo: LawRepository,
    private readonly lawService: LawService,
    private readonly lawVoteRepo: LawVoteRepository
  ) {}

  @Get()
  async getAllLaws(): Promise<Law[]> {
    const laws = await this.lawRepo.find({}, {id: 'DESC'});
    const users = await Promise.all(
      laws.map(_ => this.lawService.getUsersForLaw(_))
    );

    return laws.map((law, lawIndex) => lawWire(law, users[lawIndex]));
  }

  @Post()
  @HasRPScope('websiteProposeLaws')
  async proposeNewLaw(
    @GetSession() session: RPUserEntityStruct,
    @Body() lawDTO: LawDTOImplementation
  ): Promise<Law> {
    const newLaw = await this.lawRepo.create({
      ...lawDTO,
      userID: session.id!,
      status: LawStatus.Draft,
      createdAt: Moment().unix(),
      updatedAt: Moment().unix(),
    });

    const users = await this.lawService.getUsersForLaw({
      ...newLaw,
      user: session,
    });

    await this.lawService.registerEvent(
      newLaw.id!,
      `Initial draft submitted by ${session.username} (${session.rank!.name})`
    );

    return lawWire(newLaw, users);
  }

  @Get(':lawID')
  async getLawByID(@Param('lawID', LawPipe) law: LawEntity): Promise<Law> {
    const lawUsers = await this.lawService.getUsersForLaw(law);
    return lawWire(law, lawUsers);
  }

  @Patch(':lawID')
  @HasRPScope('websiteProposeLaws')
  async updateDraftedLaw(
    @GetSession() session: RPUserEntityStruct,
    @Param('lawID', LawPipe) law: LawEntity,
    @Body() lawDTO: LawDTOImplementation
  ): Promise<Law> {
    this.isLawAuthor(session, law);
    this.isLawDrafted(law);
    await this.lawRepo.update(
      {id: law.id!},
      {
        ...lawDTO,
        updatedAt: Moment().unix(),
      }
    );
    const lawUsers = await this.lawService.getUsersForLaw(law);

    await this.lawService.registerEvent(
      law.id!,
      `Draft updated by ${session.username} (${
        session.rank!.name
      }) with the following changes:<br/><code>${JSON.stringify(lawDTO)}</code>`
    );

    return lawWire({...law, ...lawDTO}, lawUsers);
  }

  @Delete(':lawID')
  @HasRPScope('websiteProposeLaws')
  async deleteDraftedLaw(
    @GetSession() session: RPUserEntityStruct,
    @Param('lawID', LawPipe) law: LawEntity
  ) {
    this.isLawAuthor(session, law);
    this.isLawDrafted(law);
    await this.lawRepo.delete({id: law.id!});
  }

  @Post(':lawID/voting')
  @HasRPScope('websiteOpenVotingOnLaws')
  async openVotingOnLaw(
    @Param('lawID', LawPipe) law: LawEntity,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    this.isLawDrafted(law);
    await this.lawRepo.update({id: law.id!}, {status: LawStatus.UnderReview});
    await this.lawService.registerEvent(
      law.id!,
      `Voting has been enabled by ${session.username} (${session.rank!.name})`
    );
  }

  @Post(':lawID/voting/stop')
  @HasRPScope('websiteStopVotingOnLaws')
  async stopVotingOnLaw(
    @Param('lawID', LawPipe) law: LawEntity,
    @GetSession() session: RPUserEntityStruct
  ): Promise<void> {
    if (law.status !== LawStatus.UnderReview) {
      throw new BadRequestException(
        'Only laws currently under active voting may be stopped'
      );
    }

    const [yayVotes, nayVotes] = [
      law.votes!.filter(_ => _.status === LawVoteStatus.Approved).length,
      law.votes!.filter(_ => _.status === LawVoteStatus.Rejected).length,
    ];

    if (yayVotes === nayVotes) {
      throw new BadRequestException(
        'Votes are tied and a decision cannot be made'
      );
    }

    const isApproved = yayVotes > nayVotes;

    await this.lawRepo.update(
      {id: law.id!},
      {
        status: isApproved ? LawStatus.Approved : LawStatus.Rejected,
        presidentialStatus: LawPresidentialStatus.Pending,
      }
    );
    await this.lawService.registerEvent(
      law.id!,
      `The bill has been ${
        isApproved ? 'enacted' : 'rejected'
      } with ${yayVotes} aye votes and ${nayVotes} nay votes`
    );
  }

  @Post(':lawID/vote')
  @HasRPScope('websiteVoteOnLaws')
  async voteOnLaw(
    @Param('lawID', LawPipe) law: LawEntity,
    @GetSession() session: RPUserEntityStruct,
    @Body() lawVoteDTO: LawVoteDTOImplementation
  ) {
    if (law.status !== LawStatus.UnderReview) {
      throw new BadRequestException(
        'You can not vote on pending or closed laws'
      );
    }

    if (law.votes!.find(_ => _.userID === session.id!)) {
      throw new BadRequestException('You can not change your vote');
    }

    await this.lawVoteRepo.create({
      lawID: law.id!,
      userID: session.id!,
      status: lawVoteDTO.status,
      createdAt: Moment().unix(),
      updatedAt: Moment().unix(),
    });

    await this.lawService.registerEvent(
      law.id!,
      `${session.username} (${session.rank!.name}) voted ${
        lawVoteDTO.status === LawVoteStatus.Approved ? 'aye' : 'nay'
      }`
    );
  }

  @Post(':lawID/presidential-review')
  @HasRPScope('websiteHasPresidentialPower')
  async givePresidentialReviewOnLaw(
    @Param('lawID', LawPipe) law: LawEntity,
    @GetSession() session: RPUserEntityStruct,
    @Body() {decision}: LawPresidentialDecisionDTOImplementation
  ) {
    if (law.presidentialStatus !== LawPresidentialStatus.Pending) {
      throw new BadRequestException(
        'This law has already been reviewed by the president'
      );
    }

    await this.lawRepo.update(
      {id: law.id!},
      {
        presidentialStatus:
          decision === 'approved'
            ? LawPresidentialStatus.Approved
            : LawPresidentialStatus.Rejected,
        presidentialTimestamp: Moment().unix(),
        enactedAt: decision === 'approved' ? Moment().unix() : undefined,
      }
    );
  }

  private isLawAuthor(session: RPUserEntityStruct, law: LawEntity) {
    if (law.userID !== session.id!) {
      throw new UnauthorizedException();
    }
  }

  private isLawDrafted(law: LawEntity) {
    if (law.status !== LawStatus.Draft) {
      throw new BadRequestException('Only drafted laws may be modified');
    }
  }
}
