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

export function BusinessEditorComponent({
  onSubmit,
  editorOnly,
}: BusinessEditorProps) {
  const {business} = useContext(businessEditorContext);

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
        skippable={editorOnly}
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
