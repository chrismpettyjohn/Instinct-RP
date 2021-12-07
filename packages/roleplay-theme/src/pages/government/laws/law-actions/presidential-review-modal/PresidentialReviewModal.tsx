import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {lawService} from '@instinct-plugin/roleplay-web';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {PresidentialReviewModalProps} from './PresidentialReviewModal.types';
import {RPPermissionGuard} from '../../../../../components/templates/permission-guard';
import {LawPresidentialStatus} from '@instinct-plugin/roleplay-types';

export function PresidentialReviewModal({
  law,
  onFinish,
}: PresidentialReviewModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [decision, setDecision] = useState<'approved' | 'rejected'>();

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    if (!decision) {
      return;
    }

    try {
      setSpinner(true);
      await lawService.givePresidentialReview(law.id, {decision});
      toast.success(`You ${decision} ${law.title}`);
      onFinish();
    } catch {
      toast.error(`There was a problem trying to update ${law.title}`);
    } finally {
      setSpinner(false);
    }
  }

  if (law.presidentialStatus !== LawPresidentialStatus.Pending) {
    return null;
  }

  return (
    <RPPermissionGuard
      permission="websiteHasPresidentialPower"
      redirect={false}
    >
      {isOpen && (
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <Icon type="gavel" />
            Presidential Decision: <b>{law.title}</b>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h3>Presidential Review</h3>
                <p>
                  The National Assembly has voted aye on this bill, now it's up
                  to you to decide if this bill is ultimately good for the
                  people.
                </p>
                <p>
                  Upon confirmation, your decision will be permanently saved and
                  the bill will either be vetoed or enacted immediately.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-block btn-danger"
                  onClick={() => setDecision('rejected')}
                  style={{opacity: decision === 'rejected' ? 1 : 0.7}}
                >
                  Veto
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-block btn-success"
                  onClick={() => setDecision('approved')}
                  style={{opacity: decision === 'approved' ? 1 : 0.7}}
                >
                  Enact
                </button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <span onClick={toggleModal}>Cancel</span>
            <button
              className="btn btn-outline-success ml-2"
              disabled={spinner || !decision}
              onClick={onConfirm}
            >
              {spinner ? (
                <Icon className="fa-spin" type="spinner" />
              ) : (
                'Confirm'
              )}
            </button>
          </ModalFooter>
        </Modal>
      )}
      <button className="btn btn-block btn-success" onClick={toggleModal}>
        <Icon type="gavel" />
        Presidential Decision
      </button>
    </RPPermissionGuard>
  );
}
