import {FormGroup} from 'reactstrap';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Icon, Input} from '@instinct-web/core';
import {GuideEditorProps} from './GuideEditor.types';
import {GuideDTO} from '@instinct-plugin/roleplay-types';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';

export function GuideEditor({baseGuideDTO, onSubmit}: GuideEditorProps) {
  const [spinner, setSpinner] = useState(false);
  const [guideDTO, setGuideDTO] = useState<GuideDTO>({
    name: baseGuideDTO?.name ?? '',
    content: baseGuideDTO?.content ?? '',
    categoryID: baseGuideDTO?.categoryID ?? 1,
  });

  function updateGuide<K extends keyof GuideDTO>(
    key: K,
    value: GuideDTO[K]
  ): void {
    setGuideDTO(_ => ({
      ..._,
      [key]: value,
    }));
  }

  async function onConfirmSubmit() {
    try {
      setSpinner(true);
      await onSubmit(guideDTO);
    } catch {
      toast.error('There was a problem updating your guide');
    } finally {
      setSpinner(false);
    }
  }

  const [buttonIcon, buttonText] = spinner
    ? ['spinner fa-spin', 'Saving Guide...']
    : ['savde', 'Save Guide'];

  return (
    <RPPermissionGuard permission="websiteCreateGuides">
      <FormGroup className="mb-4">
        <h4>Guide Name</h4>
        <Input
          type="text"
          name="name"
          onChange={updateGuide}
          value={guideDTO.name}
        />
      </FormGroup>
      <FormGroup className="mb-4">
        <h4>Guide Content</h4>
        <MDEditor
          value={guideDTO.content}
          onChange={(content: any) => updateGuide('content', content)}
        />
      </FormGroup>
      <FormGroup className="mb-4 text-right">
        <button
          className="btn btn-outline-success ml-2"
          disabled={spinner}
          onClick={onConfirmSubmit}
        >
          <Icon type={buttonIcon} />
          {buttonText}
        </button>
      </FormGroup>
    </RPPermissionGuard>
  );
}
