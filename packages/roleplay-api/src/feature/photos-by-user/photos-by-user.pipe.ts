import {PipeTransform, Injectable} from '@nestjs/common';
import {RPUserRepository} from '../../database/user/user.repository';
import {PhotoRepository, PhotoEntityStruct} from '@instinct-api/database';

@Injectable()
export class PhotosByUserPipe implements PipeTransform {
  constructor(
    private readonly userRepo: RPUserRepository,
    private readonly photoRepo: PhotoRepository
  ) {}

  async transform(username: string): Promise<PhotoEntityStruct[]> {
    const user = await this.userRepo.findOneOrFail({username});
    return await this.photoRepo.find({id: user.id!});
  }
}
