import {Module} from '@nestjs/common';
import {GuidePipe} from './guide,pipe';
import {SessionModule} from '../session';
import {RPUserModule} from '../user/user.module';
import {GuideController} from './guide.controller';
import {GuideCategoryPipe} from './guide-category.pipe';
import {DatabaseModule} from '../database/database.module';
import {GuideCategoryController} from './guide-category.controller';

@Module({
  imports: [DatabaseModule, SessionModule, RPUserModule],
  providers: [GuidePipe, GuideCategoryPipe],
  controllers: [GuideController, GuideCategoryController],
  exports: [GuidePipe, GuideCategoryPipe],
})
export class GuideModule {}
