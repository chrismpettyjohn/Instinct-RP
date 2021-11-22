import {Controller, Get} from '@nestjs/common';
import {HasSession} from '@instinct-api/session';

@Controller('users/high-scores')
@HasSession()
export class UserHighScoreController {
  @Get()
  async getHighScores() {}
}
