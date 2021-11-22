import {FormGroup} from 'reactstrap';
import React, {useContext} from 'react';
import {Icon} from '@instinct-web/core';
import {businessEditorContext} from '../context';
import {BadgeEditorModal} from './badge-editor-modal';
import {AddPositionModal} from './add-position-modal';
import {JobPositionsTable} from './job-positions-table';
import {BusinessTypeOption} from './business-type-selector/business-type-option/BusinessTypeOption';

export function ReviewStep() {
  const {business, setBusiness} = useContext(businessEditorContext);
  return (
    <>
      <div>
        <h2>Review</h2>
        <p style={{marginTop: -15}}>
          Please take a moment to review your business and make changes as
          necessary.
        </p>
      </div>
      <div className="mt-3">
        <h3>
          <Icon type="file-certificate" />
          Details
        </h3>
        <FormGroup>
          <div className="row">
            <div className="col-8">
              <h4>Business Name</h4>
              <input
                className="form-control"
                type="text"
                value={business.name}
                onChange={e => setBusiness('name', e.target.value)}
              />
            </div>
            <div className="col-4">
              <BadgeEditorModal />
            </div>
          </div>
        </FormGroup>
        <FormGroup className="mb-3">
          <h3>
            <Icon type="industry-alt" />
            Industry
          </h3>
          <div className="col-6">
            <BusinessTypeOption businessType={business.type} selected />
          </div>
        </FormGroup>
        <FormGroup className="mt-3">
          <h3>
            <Icon type="users" />
            Job Positions
          </h3>
          <JobPositionsTable />
          <AddPositionModal />
        </FormGroup>
      </div>
    </>
  );
}
