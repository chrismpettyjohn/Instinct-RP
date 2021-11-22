import {BusinessEntity} from './business.entity';
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
    positions: entity.positions!.map(jobPosition => ({
      id: jobPosition.jobRankID!,
      businessID: jobPosition.jobID,
      name: jobPosition.name,
      employees: employees.filter(
        jobEmployee => jobEmployee.rpStats.job!.positionID === jobPosition.id!
      ),
      order: jobPosition.id!,
      governmentBranch: jobPosition.governmentBranch,
      femaleUniform: jobPosition.femaleUniform,
      maleUniform: jobPosition.maleUniform,
      shiftWage: jobPosition.shiftWage,
    })),
  };
}
