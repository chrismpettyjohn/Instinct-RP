import {Module} from '@nestjs/common';
import {GangModule} from './gang/gang.module';
import {RPUserModule} from './user/user.module';
import {SessionModule} from './session/session.module';
import {FeatureModule} from './feature/feature.module';
import {DatabaseModule} from './database/database.module';
import {BusinessModule} from './business/business.module';
import {GovernmentModule} from './government/government.module';
import {GuideModule} from './guide/guide.module';
import {FoodModule} from './food/food.module';
import {GamblingMachineModule} from './gambling-machine/gambling-machine.module';
import {WeaponModule} from './weapon/weapon.module';
import {VendingMachineModule} from './vending-machine/vending-machine.module';

@Module({
  imports: [
    DatabaseModule,
    BusinessModule,
    GangModule,
    GuideModule,
    SessionModule,
    FeatureModule,
    RPUserModule,
    FoodModule,
    GovernmentModule,
    GamblingMachineModule,
    WeaponModule,
    VendingMachineModule,
  ],
  exports: [
    DatabaseModule,
    BusinessModule,
    GuideModule,
    GangModule,
    SessionModule,
    FeatureModule,
    RPUserModule,
    FoodModule,
    GovernmentModule,
    GamblingMachineModule,
    WeaponModule,
    VendingMachineModule,
  ],
})
export class InstinctRPModule {}
