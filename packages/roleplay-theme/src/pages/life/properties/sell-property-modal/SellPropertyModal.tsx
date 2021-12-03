import Toggle from 'react-toggle';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Photo} from '@instinct-prj/interface';
import {PropertyDTO, RPRoom} from '@instinct-plugin/roleplay-types';
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
import {PhotoSelector} from '../../../../components/templates/photo-selector/PhotoSelector';
import {RoomSelector} from '../../../../components/templates/room-selector/RoomSelector';

export function SellPropertyModal({onChange}: SellPropertyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [propertyDTO, setPropertyDTO] = useState<Partial<PropertyDTO>>({
    roomID: undefined,
    photoIDs: undefined,
    buyNowPrice: undefined,
  });

  const [activePhoto, setActivePhoto] = useState(
    'https://i.imgur.com/RJnrGFD.png'
  );

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

  function onPhotoChange(newPhoto: Photo) {
    setActivePhoto(newPhoto.imagePath);
    setPropertyDTO(_ => ({
      ..._,
      photoIDs: [newPhoto.id],
    }));
  }

  function onRoomChange(newRoom: RPRoom) {
    setPropertyDTO(_ => ({
      ..._,
      roomID: newRoom.id,
    }));
  }
  function onValueChange(newValue: Partial<PropertyDTO>) {
    setPropertyDTO(_ => ({
      ..._,
      ...newValue,
    }));
  }

  const canBeSaved =
    propertyDTO.roomID && propertyDTO.photoIDs && propertyDTO.buyNowPrice;

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
                <div
                  style={{
                    display: 'block',
                    backgroundImage: `url(${activePhoto})`,
                    backgroundSize: 'cover',
                    border: '2px solid white',
                    borderRadius: 4,
                    cursor: 'pointer',
                    height: 300,
                    width: 300,
                  }}
                />
              </div>
              <div className="col-7">
                <Form submit={onSubmit}>
                  <FormGroup>
                    <Label>Property</Label>
                    <RoomSelector
                      onChange={onRoomChange}
                      roomID={propertyDTO.roomID}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Property Photo</Label>
                    <PhotoSelector
                      onChange={onPhotoChange}
                      photoID={propertyDTO.photoIDs?.[0]}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Buy Now Price</Label>
                    <Input
                      type="number"
                      value={propertyDTO.buyNowPrice}
                      onChange={e =>
                        onValueChange({buyNowPrice: Number(e.target.value)})
                      }
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <span onClick={toggleModal}>Cancel</span>
            <button
              className="btn btn-outline-primary ml-2"
              disabled={spinner || !canBeSaved}
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
