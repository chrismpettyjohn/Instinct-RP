import React from 'react';
import {LawStatus} from '@instinct-plugin/roleplay-types';

export function getPrettyLawStatus(status: LawStatus) {
  const lawStatusText: Record<LawStatus, [string, string]> = {
    [LawStatus.Draft]: ['Draft', 'warning'],
    [LawStatus.UnderReview]: ['Under Review', 'info'],
    [LawStatus.Approved]: ['Approved - In Force', 'success'],
    [LawStatus.Rejected]: ['Rejected - Closed', 'danger'],
  };

  const lawStatus = lawStatusText[status];

  return <span className={`text-${lawStatus[1]}`}>{lawStatus[0]}</span>;
}
