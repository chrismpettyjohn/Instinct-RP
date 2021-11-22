import {toast} from 'react-toastify';
import React, {useState} from 'react';
import {CreatePostModalProps} from './CreatePostModal.types';
import {Form, guestbookService, Icon, Loading} from '@instinct-web/core';
import {
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

export function CreatePostModal({profileID, onCreation}: CreatePostModalProps) {
  const [spinner, setSpinner] = useState(false);
  const [content, setContent] = useState('');
  const [showModal, setModal] = useState(false);

  function onToggle() {
    setModal(_ => !_);
  }

  async function onSubmit() {
    try {
      setSpinner(true);
      const newPost = await guestbookService.create(profileID, {content});
      onCreation(newPost);
      setContent('');
      setSpinner(false);
      setModal(false);
      toast.info('Your comment has been posted!');
    } catch {
      setSpinner(false);
      toast.error("There was a problem and your comment couldn't be saved");
    }
  }

  return (
    <>
      <button className="btn btn-primary" onClick={onToggle}>
        <Icon type="plus-circle" />
        Post
      </button>
      <Modal isOpen={showModal} toggle={onToggle}>
        <ModalHeader toggle={onToggle}>Post to Guestbook</ModalHeader>
        <Form className="" disabled={spinner} onSubmit={onSubmit}>
          <ModalBody>
            <Loading isLoading={spinner}>
              <FormGroup>
                <h4>What do you want to say?</h4>
                <textarea
                  className="form-control"
                  rows={4}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  maxLength={200}
                />
              </FormGroup>
            </Loading>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-success"
              disabled={spinner}
              type="submit"
            >
              Create
            </button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
