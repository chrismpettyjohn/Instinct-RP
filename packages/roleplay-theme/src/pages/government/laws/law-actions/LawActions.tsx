import {Link} from 'wouter';
import {Row} from 'reactstrap';
import React, {ReactNode, useContext} from 'react';
import {LawActionsProps} from './LawActions.types';
import {Icon, sessionContext} from '@instinct-web/core';
import {VoteOnLawModal} from './vote-on-law-modal/VoteOnLawModal';
import {OpenVotingModal} from './open-voting-modal/OpenVotingModal';
import {DismissLawModal} from './dismiss-law-modal/DismissLawModal';
import {LawStatus, LawVoteStatus} from '@instinct-plugin/roleplay-types';
import {RPPermissionGuard} from '../../../../components/templates/permission-guard';
import {CloseVotingModal} from './close-voting-modal/CloseVotingModal';

export function LawActions({law, onChange}: LawActionsProps) {
  const {user} = useContext(sessionContext);

  const isAuthor = law.user.id === user!.id;
  const hasVoted = law.votes.find(_ => _.user.id === user!.id);

  const lawStatusToActions: Record<LawStatus, ReactNode> = {
    [LawStatus.Draft]: <p>Voting for this law has not started yet</p>,
    [LawStatus.UnderReview]: !hasVoted ? (
      <div className="d-flex">
        <VoteOnLawModal
          law={law}
          vote={LawVoteStatus.Approved}
          onFinish={onChange}
        >
          <button className="btn btn-outline-success mr-4">
            <Icon type="thumbs-up" />
            Approve
          </button>
        </VoteOnLawModal>
        <VoteOnLawModal
          law={law}
          vote={LawVoteStatus.Rejected}
          onFinish={onChange}
        >
          <button className="btn btn-outline-danger mr-4">
            <Icon type="thumbs-down" />
            Reject
          </button>
        </VoteOnLawModal>
      </div>
    ) : (
      <p>You already voted on this law</p>
    ),
    [LawStatus.Approved]: <p>Voting for this law has finished</p>,
    [LawStatus.Rejected]: <p>Voting for this law has finished</p>,
  };

  return (
    <Row>
      <div className="col-6" style={{borderRight: '1px solid white'}}>
        <h4>Voting</h4>
        {lawStatusToActions[law.status]}
      </div>
      <div className="col-6">
        <h4>Other</h4>
        <RPPermissionGuard permission="websiteVoteOnLaws" redirect={false}>
          {isAuthor && law.status === LawStatus.Draft && (
            <Link to={`/government/laws/edit/${law.id}`}>
              <button className="btn btn-outline-info mr-4">
                <Icon type="edit" />
                Edit
              </button>
            </Link>
          )}
        </RPPermissionGuard>
        <DismissLawModal law={law} />
        <OpenVotingModal law={law} onFinish={onChange} />
        <CloseVotingModal law={law} onFinish={onChange} />
      </div>
    </Row>
  );
}
