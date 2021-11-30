import {FormGroup} from 'reactstrap';
import React, {useContext} from 'react';
import {Icon, Input} from '@instinct-web/core';
import {businessEditorContext} from '../context';
import {BadgeEditorModal} from './badge-editor-modal';
import {HomeRoomSelector} from './home-room-selector';

export function DetailsStep() {
  const {business, setBusiness} = useContext(businessEditorContext);
  return (
    <>
      <h2>
        <Icon type="file-certificate" />
        Details
      </h2>
      <FormGroup className="mt-3" style={{padding: 2}}>
        <div className="row">
          <div className="col-8">
            <h4>Business Name</h4>
            <Input
              type="text"
              name="name"
              onChange={setBusiness}
              value={business.name}
            />
          </div>
          <div className="col-4">
            <BadgeEditorModal />
          </div>
        </div>
      </FormGroup>
      <FormGroup className="mt-3" style={{padding: 2}}>
        <h4>Home Room</h4>
        <HomeRoomSelector />
      </FormGroup>
      <FormGroup className="mt-3" style={{padding: 2}}>
        <h4>Business Description</h4>
        <textarea
          className="form-control"
          rows={5}
          onChange={e => setBusiness('desc', e.target.value)}
          value={business.desc}
        />
      </FormGroup>
    </>
  );
}
