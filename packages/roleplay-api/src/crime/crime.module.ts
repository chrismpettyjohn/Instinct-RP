import {CrimePipe} from './crime.pipe';
import {Module} from '@nestjs/common';
import {CrimeController} from './crime.controller';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CrimeController],
  providers: [CrimePipe],
  exports: [CrimePipe],
})
export class CrimeModule {}
