import {FormGroup} from 'reactstrap';
import React, {useState} from 'react';
import {Icon, Input, Select} from '@instinct-web/core';
import {Card} from '../../../../components/generic/card/Card';
import {EditPoliticalPartyProps} from './EditParty.types';
import {
  PoliticalIdeology,
  PoliticalPartyDTO,
} from '@instinct-plugin/roleplay-types';
import {BadgeSelectorModal} from '../../../../components/templates/badge-selector-modal';

const PARTY_TYPES = [
  {
    value: PoliticalIdeology.Leftist,
    label: 'Leftist',
  },
  {
    value: PoliticalIdeology.Center,
    label: 'Center',
  },
  {
    value: PoliticalIdeology.Rightist,
    label: 'Rightist',
  },
  {
    value: PoliticalIdeology.Other,
    label: 'Other',
  },
];

export function EditPoliticalParty({
  basePoliticalPartyDTO,
  onSubmit,
}: EditPoliticalPartyProps) {
  const [spinner, setSpinner] = useState(false);
  const [politicalPartyDTO, setPoliticalPartyDTO] = useState<PoliticalPartyDTO>(
    {
      name: basePoliticalPartyDTO?.name ?? '',
      description: basePoliticalPartyDTO?.description ?? '',
      about: basePoliticalPartyDTO?.about ?? '',
      badge: basePoliticalPartyDTO?.badge ?? 'BR248',
      ideology: basePoliticalPartyDTO?.ideology ?? PoliticalIdeology.Center,
    }
  );

  function updatePoliticalParty<K extends keyof PoliticalPartyDTO>(
    key: K,
    value: PoliticalPartyDTO[K]
  ): void {
    setPoliticalPartyDTO(_ => ({
      ..._,
      [key]: value,
    }));
  }

  async function onConfirm() {
    try {
      setSpinner(true);
      await onSubmit(politicalPartyDTO);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <>
      <div className="col-12">
        <Card header="Bill Details">
          <FormGroup className="mt-2" style={{padding: 2}}>
            <div className="row">
              <div className="col-8">
                <h4>Party Name</h4>
                <Input
                  type="text"
                  name="name"
                  onChange={updatePoliticalParty}
                  value={politicalPartyDTO.name}
                />
              </div>
              <div className="col-4">
                <BadgeSelectorModal
                  badge={politicalPartyDTO.badge}
                  onChange={newBadge => updatePoliticalParty('badge', newBadge)}
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup className="mb-2">
            <h4>Party Description</h4>
            <textarea
              className="form-control"
              onChange={e =>
                updatePoliticalParty('description', e.target.value)
              }
              value={politicalPartyDTO.description}
              rows={4}
              style={{width: '100%'}}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <h4>Party About</h4>
            <textarea
              className="form-control"
              onChange={e => updatePoliticalParty('about', e.target.value)}
              value={politicalPartyDTO.about}
              rows={10}
              style={{width: '100%'}}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <h4>Party Ideology</h4>
            <Select
              options={PARTY_TYPES}
              value={
                PARTY_TYPES.find(_ => _.value === politicalPartyDTO.ideology) ??
                null
              }
              onChange={(_: any) => updatePoliticalParty('ideology', _.value)}
            />
          </FormGroup>
          <FormGroup className="mb-2 text-right">
            <button
              className="btn btn-outline-success ml-2"
              onClick={onConfirm}
              disabled={spinner}
            >
              {spinner ? (
                <>
                  <Icon className="fa-spin" type="spinner" /> Saving Changes...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </FormGroup>
        </Card>
      </div>
    </>
  );
}
