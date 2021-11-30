import React, {useContext, useState} from 'react';
import {businessEditorContext} from '../../context';
import {Form, Icon, Input, sessionContext} from '@instinct-web/core';
import {FormGroup, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {BusinessPositionDTO} from '@instinct-plugin/roleplay-types';
import {EditPositionModalProps} from './EditPostionModal.types';

export function EditPositionModal({positionIndex}: EditPositionModalProps) {
  const {user} = useContext(sessionContext);
  const [showModal, setModal] = useState(false);
  const {business, editPosition} = useContext(businessEditorContext);

  const position = business.positions[positionIndex]!;

  function onToggle() {
    setModal(_ => !_);
  }

  function onChange<K extends keyof BusinessPositionDTO>(
    key: K,
    value: BusinessPositionDTO[K]
  ) {
    editPosition(positionIndex, key, value);
  }

  return (
    <>
      <div className="w-100 text-right mb-5">
        <Icon type="pencil" onClick={onToggle} style={{cursor: 'pointer'}} />
      </div>
      <Modal isOpen={showModal} toggle={onToggle}>
        <ModalHeader toggle={onToggle}>
          Editing <b>{position.name}</b>
        </ModalHeader>
        <Form className="">
          <ModalBody>
            <div>
              <h3>Details</h3>
              <FormGroup>
                <h4>Name</h4>
                <Input
                  type="text"
                  name="name"
                  onChange={onChange}
                  value={position.name}
                />
              </FormGroup>
            </div>
            <div>
              <div>
                <h3>Salary</h3>
                <FormGroup>
                  <div className="row" style={{fontSize: 20}}>
                    <div className="col-4">$0</div>
                    <div
                      className="col-4 text-center "
                      style={{fontWeight: 500}}
                    >
                      ${position.shiftWage}
                    </div>
                    <div className="col-4 text-right">100</div>
                  </div>
                  <input
                    type="range"
                    className="form-control-range"
                    value={position.shiftWage}
                    onChange={e =>
                      onChange('shiftWage', Number(e.target.value))
                    }
                    min={0}
                    max={user!.credits}
                  />
                </FormGroup>
              </div>
            </div>
          </ModalBody>
        </Form>
      </Modal>
    </>
  );
}
