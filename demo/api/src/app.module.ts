import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from '@instinct-api/users';
import {RankModule} from '@instinct-api/ranks';
import {ForumModule} from '@instinct-api/forum';
import {EmailModule} from '@instinct-api/emails';
import {GroupModule} from '@instinct-api/groups';
import {PhotoModule} from '@instinct-api/photos';
import {RoomModule} from '@instinct-api/rooms';
import {ConfigModule} from '@instinct-api/config';
import {GoogleModule} from '@instinct-api/google';
import {HealthModule} from '@instinct-api/health';
import {SessionModule} from '@instinct-api/session';
import {ArticleModule} from '@instinct-api/articles';
import {EmulatorModule} from '@instinct-api/emulator';
import {BetaCodeModule} from '@instinct-api/beta-codes';
import {FindRetrosModule} from '@instinct-plugin/findretros-api';
import {ManageUsersModule} from '@instinct-plugin/manage-users-api';
import {databaseMigrations} from '@instinct-api/database-migrations';
import {databaseEntities, DatabaseModule} from '@instinct-api/database';
import {UserGuestbookModule} from '@instinct-plugin/user-guestbook-api';
import {ForgotPasswordModule} from '@instinct-plugin/forgot-password-api';
import {
  InstinctRPModule,
  rpDatabaseEntities,
} from '@instinct-plugin/roleplay-api';
import {
  CommonModule,
  databaseHost,
  databaseName,
  databasePass,
  databaseUser,
} from '@instinct-api/common';

@Module({
  imports: [
    ArticleModule,
    BetaCodeModule,
    CommonModule,
    ConfigModule,
    ForumModule,
    DatabaseModule,
    EmailModule,
    EmulatorModule,
    GoogleModule,
    GroupModule,
    HealthModule,
    PhotoModule,
    RankModule,
    RoomModule,
    SessionModule,
    UserModule,
    FindRetrosModule,
    ManageUsersModule,
    UserGuestbookModule,
    ForgotPasswordModule,
    InstinctRPModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseHost,
      username: databaseUser,
      password: databasePass,
      database: databaseName,
      entities: [...databaseEntities, ...rpDatabaseEntities],
      synchronize: false,
      migrationsRun: true,
      migrations: databaseMigrations,
    }),
  ],
})
export class InstinctBobbaThemeAPI {}
