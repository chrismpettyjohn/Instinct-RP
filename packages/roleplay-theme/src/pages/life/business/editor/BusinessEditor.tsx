import {Redirect} from 'wouter';
import React, {useContext} from 'react';
import {BusinessEditorProps} from './BusinessEditor.types';
import {businessEditorContext, BusinessEditorProvider} from './context';
import {WizardCard} from '../../../../components/generic/wizard-card/WizardCard';
import {
  BusinessCategoryStep,
  DetailsStep,
  EmployeesStep,
  ReviewStep,
} from './steps';
import {sessionContext} from '@instinct-web/core';
import {businessRegistrationFee} from '../Business.const';
import {toast} from 'react-toastify';

export function BusinessEditorComponent({
  onSubmit,
  editorOnly,
}: BusinessEditorProps) {
  const {user} = useContext(sessionContext);
  const {business} = useContext(businessEditorContext);

  if ((user?.credits ?? 0) < businessRegistrationFee && !editorOnly) {
    toast.error(
      `You must have $${Number(
        businessRegistrationFee
      ).toLocaleString()} to register a busienss`
    );
    return <Redirect to="/businesses" />;
  }

  function onSubmitForm() {
    onSubmit(business);
  }

  return (
    <>
      <WizardCard
        steps={[
          {
            text: 'Details',
            children: <DetailsStep />,
          },
          {
            text: 'Industry',
            children: <BusinessCategoryStep />,
          },
          {
            text: 'Employees',
            children: <EmployeesStep />,
          },
          {
            text: 'Review',
            children: <ReviewStep />,
          },
        ]}
        onSubmit={onSubmitForm}
      />
    </>
  );
}

export function BusinessEditor(props: BusinessEditorProps) {
  return (
    <BusinessEditorProvider defaultBusiness={props.defaultBusiness}>
      <BusinessEditorComponent {...props} />
    </BusinessEditorProvider>
  );
}
