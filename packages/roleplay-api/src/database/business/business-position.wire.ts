import {BusinessPositionEntity} from './business-position.entity';
import {BusinessPosition, RPUser} from '@instinct-plugin/roleplay-types';

export function businessPositionWire(
  entity: BusinessPositionEntity,
  employees: RPUser[]
): BusinessPosition {
  return {
    id: entity.jobRankID!,
    businessID: entity.jobID,
    name: entity.name,
    employees,
    order: entity.id!,
    governmentBranch: entity.governmentBranch,
    femaleUniform: entity.femaleUniform,
    maleUniform: entity.maleUniform,
    shiftWage: entity.shiftWage,
    openPositions: entity.openPositions,
  };
}
