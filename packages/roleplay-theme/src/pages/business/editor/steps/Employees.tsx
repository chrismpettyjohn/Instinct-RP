import React from 'react';
import {FormGroup} from 'reactstrap';
import {Icon} from '@instinct-web/core';
import {AddPositionModal} from './add-position-modal';
import {JobPositionsTable} from './job-positions-table';

export function EmployeesStep() {
  return (
    <>
      <h2>
        <Icon type="users" />
        Employees
      </h2>
      <FormGroup>
        <h3>Positions</h3>
        <p>
          Employees in your organization will assigned a job position. Their
          position sets their uniform, pay and privileges.
        </p>
        <JobPositionsTable />
        <AddPositionModal />
      </FormGroup>
    </>
  );
}
