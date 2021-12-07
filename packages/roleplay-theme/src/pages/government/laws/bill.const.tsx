import React from 'react';
import {
  Law,
  LawPresidentialStatus,
  LawStatus,
} from '@instinct-plugin/roleplay-types';

export function getPrettyLawStatus(law: Law) {
  const lawStatusText: Record<LawStatus, [string, string]> = {
    [LawStatus.Draft]: ['Draft', 'warning'],
    [LawStatus.UnderReview]: ['Under Review', 'info'],
    [LawStatus.Approved]: ['Approved - In Force', 'success'],
    [LawStatus.Rejected]: ['Rejected - Closed', 'danger'],
  };

  if (law.presidentialStatus === LawPresidentialStatus.Pending) {
    return <span style={{color: '#6A1B9A'}}>Waiting on the President</span>;
  }

  const lawStatus = lawStatusText[law.status];

  return <span className={`text-${lawStatus[1]}`}>{lawStatus[0]}</span>;
}

export function getPrettyPresidentialStatus(law: Law) {
  const lawPresidentialStatusText: Record<
    LawPresidentialStatus,
    [string, string]
  > = {
    [LawPresidentialStatus.NotValid]: ['N/A', 'white'],
    [LawPresidentialStatus.Pending]: ['Pending', 'info'],
    [LawPresidentialStatus.Approved]: ['Approved', 'success'],
    [LawPresidentialStatus.Rejected]: ['Rejected', 'danger'],
  };

  const presidentialStatus = lawPresidentialStatusText[law.presidentialStatus];
  return (
    <span className={`text-${presidentialStatus[1]}`}>
      {presidentialStatus[0]}
    </span>
  );
}
