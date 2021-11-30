import React, {useContext, useState} from 'react';
import {businessEditorContext} from '../../context';
import {Form, Icon, Input, sessionContext} from '@instinct-web/core';
import {
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {
  BusinessPositionDTO,
  exampleBusinessPositionDTO,
} from '@instinct-plugin/roleplay-types';

export function AddPositionModal() {
  const {user} = useContext(sessionContext);
  const {addPosition} = useContext(businessEditorContext);
  const [showModal, setModal] = useState(false);
  const [position, setPositionState] = useState(exampleBusinessPositionDTO);

  function onToggle() {
    setModal(_ => !_);
  }

  function onCancel() {
    setPositionState(exampleBusinessPositionDTO);
    onToggle();
  }

  function onSubmit() {
    addPosition(position);
    setPositionState(exampleBusinessPositionDTO);
    onToggle();
  }

  function onChange<K extends keyof BusinessPositionDTO>(
    key: K,
    value: BusinessPositionDTO[K]
  ) {
    setPosition({[key]: value});
  }

  function setPosition(changes: Partial<BusinessPositionDTO>) {
    setPositionState(_ => ({
      ..._,
      ...changes,
    }));
  }

  return (
    <>
      <div className="w-100 text-right mb-5">
        <button className="btn btn-outline-info btn-sm" onClick={onToggle}>
          <Icon type="plus-circle" />
          Add Position
        </button>
      </div>
      <Modal isOpen={showModal} toggle={onToggle}>
        <ModalHeader toggle={onToggle}>Add Job Position</ModalHeader>
        <Form className="" onSubmit={onSubmit}>
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
          <ModalFooter>
            <span onClick={onCancel}>Cancel</span>
            <button
              className="btn btn-outline-success ml-2"
              type="submit"
              onSubmit={onSubmit}
            >
              Accept
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
