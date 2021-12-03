import {useLocation} from 'wouter';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Photo} from '@instinct-prj/interface';
import {propertyService} from '@instinct-plugin/roleplay-web';
import {PropertyDTO, RPRoom} from '@instinct-plugin/roleplay-types';
import {PhotoSelector} from '../../../../components/templates/photo-selector/PhotoSelector';
import {RoomSelector} from '../../../../components/templates/room-selector/RoomSelector';
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

export function SellPropertyModal() {
  const [location, setLocation] = useLocation();
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

  const canBeSaved =
    propertyDTO.roomID && propertyDTO.photoIDs && propertyDTO.buyNowPrice;

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onSubmit(event: any) {
    event?.preventDefault();
    if (!canBeSaved) return;
    try {
      setSpinner(true);
      const newProperty = await propertyService.create(propertyDTO as any);
      toast.success(
        `You successfully listed ${newProperty.room.roomName} for sale!`
      );
      setLocation(`/properties/${newProperty.id}`);
    } catch (e) {
      console.log(e);
      toast.error('Your property could not be listed at ths time');
    } finally {
      setSpinner(false);
    }
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
              onClick={onSubmit}
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
