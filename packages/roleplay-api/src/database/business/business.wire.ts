import {BusinessEntity} from './business.entity';
import {businessPositionWire} from './business-position.wire';
import {Business, RPUser} from '@instinct-plugin/roleplay-types';

export function businessWire(
  entity: BusinessEntity,
  employees: RPUser[] = []
): Business {
  entity.positions!.reverse();
  return {
    id: entity.id!,
    owner: employees.find(_ => _.id === entity.userID)!,
    name: entity.name,
    type: entity.type,
    desc: entity.desc,
    badge: entity.badge,
    homeRoomID: entity.workRoom,
    positions: entity.positions!.map(jobPosition =>
      businessPositionWire(
        jobPosition,
        employees.filter(
          jobEmployee => jobEmployee.rpStats.job!.positionID === jobPosition.id!
        )
      )
    ),
  };
}
