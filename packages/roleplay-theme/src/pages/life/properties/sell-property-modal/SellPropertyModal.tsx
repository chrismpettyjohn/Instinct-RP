import Toggle from 'react-toggle';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {SellPropertyModalProps} from './SellPropertyModal.types';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

export function SellPropertyModal({}: SellPropertyModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onConfirm() {
    try {
      setSpinner(true);
    } finally {
      setSpinner(false);
    }
  }

  async function onSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} size="lg" toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            <Icon type="plus-circle" />
            Sell Property
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-5">
                <img
                  src="https://game.bobba.ca/clips/10.png"
                  width={300}
                  height={300}
                  style={{border: '2px solid white', borderRadius: 4}}
                />
              </div>
              <div className="col-7">
                <Form submit={onSubmit}>
                  <FormGroup>
                    <Label>Property</Label>
                    <Input />
                  </FormGroup>
                  <FormGroup>
                    <Label>Property Photo</Label>
                    <Input />
                  </FormGroup>
                  <FormGroup>
                    <Label>Buy Now Price</Label>
                    <Input type="number" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Allow Bidding</Label>
                    <br />
                    <Toggle />
                  </FormGroup>
                </Form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <span onClick={toggleModal}>Cancel</span>
            <button
              className="btn btn-outline-primary ml-2"
              disabled={spinner}
              onClick={onConfirm}
            >
              {spinner ? (
                <Icon className="fa-spin" type="spinner" />
              ) : (
                <>Save Changes</>
              )}
            </button>
          </ModalFooter>
        </Modal>
      )}
      <button
        className="btn btn-success"
        onClick={toggleModal}
        disabled={spinner}
      >
        <Icon type="plus-circle" />
        Sell Property
      </button>
    </>
  );
}
