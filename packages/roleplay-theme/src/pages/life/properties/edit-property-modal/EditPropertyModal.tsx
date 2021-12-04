import Moment from 'moment';
import {toast} from 'react-toastify';
import React, {useContext, useState} from 'react';
import {PropertyDTO} from '@instinct-plugin/roleplay-types';
import {Icon, sessionContext, Select} from '@instinct-web/core';
import {EditPropertyModalProps} from './EditPropertyModal.types';
import {PhotoSlider} from '../../../../components/templates/photo-slider/PhotoSlider';
import {
  propertyService,
  useFetchPhotosByUsername,
} from '@instinct-plugin/roleplay-web';
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

export function EditPropertyModal({
  property,
  onChange,
}: EditPropertyModalProps) {
  const {user} = useContext(sessionContext);
  const [spinner, setSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const photos = useFetchPhotosByUsername(user!.username);
  const [propertyDTO, setPropertyDTO] = useState<PropertyDTO>({
    roomID: property.room.id,
    photoIDs: property.photos.map(_ => _.id),
    buyNowPrice: property.buyNowPrice,
  });

  function toggleModal(): void {
    setIsOpen(_ => !_);
  }

  async function onSubmit(event: any) {
    event?.preventDefault();
    try {
      setSpinner(true);
      await propertyService.updateByID(property.id.toString(), propertyDTO);
      toast.success(`You successfully updated ${property.room.roomName}`);
      toggleModal();
      onChange();
    } catch (e) {
      toast.error('Your property could not be updated ths time');
    } finally {
      setSpinner(false);
    }
  }

  function onPhotoChange(newPhoto: any) {
    console.log(newPhoto);
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
            Editing Property: <b>{property.room.roomName}</b>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-5">
                <PhotoSlider photos={photos ?? []} />
              </div>
              <div className="col-7">
                <Form submit={onSubmit}>
                  <FormGroup>
                    <Label>Property Photos</Label>
                    <Select
                      options={photos ?? []}
                      getOptionLabel={_ =>
                        `Photo ${Moment.unix(_.createdAt).format(
                          'MMM DD, YYYY'
                        )} #${_.id}`
                      }
                      getOptionValue={_ => _.id as any}
                      value={
                        photos?.filter(_ =>
                          propertyDTO.photoIDs.includes(_.id)
                        ) ?? null
                      }
                      onChange={onPhotoChange}
                      isMulti
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
              disabled={spinner}
              onClick={onSubmit}
            >
              {spinner ? (
                <>
                  <Icon type="spinner fa-spin" /> Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </ModalFooter>
        </Modal>
      )}
      <button className="btn btn-outline-primary" onClick={toggleModal}>
        <Icon type="pencil" />
        Make Changes
      </button>
    </>
  );
}
