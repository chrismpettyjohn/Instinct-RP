import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommonModule} from '@instinct-api/common';
import {rpDatabaseEntities, rpDatabaseProviders} from './database.meta';
import {DatabaseModule as BaseDatabaseModule} from '@instinct-api/database';

@Module({
  imports: [
    BaseDatabaseModule,
    TypeOrmModule.forFeature(rpDatabaseEntities),
    CommonModule,
  ],
  providers: [...rpDatabaseProviders],
  exports: [BaseDatabaseModule, TypeOrmModule, ...rpDatabaseProviders],
})
@Global()
export class DatabaseModule {}
