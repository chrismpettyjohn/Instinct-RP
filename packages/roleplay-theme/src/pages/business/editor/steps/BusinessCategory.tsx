import React from 'react';
import {Icon} from '@instinct-web/core';
import {Row} from '../../../../components/generic/row/Row';
import {BusinessTypeSelector} from './business-type-selector/BusinessTypeSelector';

export function BusinessCategoryStep() {
  return (
    <Row>
      <div className="col-12 mb-4">
        <h2>
          <Icon type="industry-alt" />
          Business Industry
        </h2>
      </div>
      <div className="col-12">
        <BusinessTypeSelector />
      </div>
    </Row>
  );
}
