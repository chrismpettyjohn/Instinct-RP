import {FormGroup} from 'reactstrap';
import React, {useState} from 'react';
import {Input} from '@instinct-web/core';
import MDEditor from '@uiw/react-md-editor';
import {EditLawProps} from './EditLaw.types';
import {LawDTO} from '@instinct-plugin/roleplay-types';
import {Card} from '../../../../components/generic/card/Card';
import {SubmitLawModal} from './submit-law-modal/SubmitLawModal';

export function EditLaw({baseLawDTO, onSubmit}: EditLawProps) {
  const [lawDTO, setLawDTO] = useState<LawDTO>({
    title: baseLawDTO?.title ?? '',
    description: baseLawDTO?.description ?? '',
    content: baseLawDTO?.content ?? '',
  });

  function updateLaw<K extends keyof LawDTO>(key: K, value: LawDTO[K]): void {
    setLawDTO(_ => ({
      ..._,
      [key]: value,
    }));
  }

  function onConfirmSubmit() {
    return onSubmit(lawDTO);
  }

  return (
    <>
      <div className="col-12">
        <Card header="Bill Details">
          <FormGroup className="mb-2">
            <h4>Bill Short Name</h4>
            <Input
              type="text"
              name="title"
              onChange={updateLaw}
              value={lawDTO.title}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <h4>Bill Long Name</h4>
            <Input
              type="text"
              name="description"
              onChange={updateLaw}
              value={lawDTO.description}
              å
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <h4>Bill Content</h4>
            <MDEditor
              value={lawDTO.content}
              onChange={(content: any) => updateLaw('content', content)}
            />
          </FormGroup>
          <FormGroup className="mb-2 text-right">
            <SubmitLawModal
              onSubmit={onConfirmSubmit}
              skipCheck={!!baseLawDTO}
            />
          </FormGroup>
        </Card>
      </div>
    </>
  );
}
