import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtSecret} from '@instinct-api/common';
import {UserEntityStruct} from '@instinct-api/database';
import {RPUserRepository} from '../database/user/user.repository';

@Injectable()
export class RPBearerTokenStrategy extends PassportStrategy(
  Strategy,
  'bearer-token'
) {
  constructor(private readonly userRepo: RPUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate({
    userID,
  }: Record<'userID', number>): Promise<UserEntityStruct> {
    return this.userRepo.findOneOrFail({id: userID});
  }
}
