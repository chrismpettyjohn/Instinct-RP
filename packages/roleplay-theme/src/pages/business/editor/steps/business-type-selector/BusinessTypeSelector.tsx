import React, {useContext} from 'react';
import {businessEditorContext} from '../../context';
import {businessTypes} from './BusinessTypes.const';
import {BusinessType} from '@instinct-plugin/roleplay-types';
import {Row} from '../../../../../components/generic/row/Row';
import {BusinessTypeOption} from './business-type-option/BusinessTypeOption';

export function BusinessTypeSelector() {
  const {business, setBusiness} = useContext(businessEditorContext);

  function selectBusinessType(businessType: BusinessType) {
    setBusiness('type', businessType);
  }

  return (
    <Row className="spacing-2">
      {businessTypes
        .filter(_ => !_.hidden)
        .map(businessType => (
          <div
            className="col-6 mb-4"
            key={`business_type_${businessType.value}`}
          >
            <BusinessTypeOption
              businessType={businessType.value}
              onClick={() => selectBusinessType(businessType.value)}
              selected={business.type === businessType.value}
            />
          </div>
        ))}
    </Row>
  );
}
