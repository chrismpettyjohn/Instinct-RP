import {toast} from 'react-toastify';
import React, {useContext, useState} from 'react';
import {DeletePostModalProps} from './DeletePostModal.types';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {guestbookService, Icon, sessionContext} from '@instinct-web/core';

export function DeletePostModal({post, onDeletion}: DeletePostModalProps) {
  const {user} = useContext(sessionContext);
  const [showModal, setModal] = useState(false);

  function onToggle() {
    setModal(_ => !_);
  }

  async function onSubmit() {
    try {
      await guestbookService.delete(post.profileID, post.id);
      setModal(false);
      onDeletion(post.id);
      toast.info('Your comment has been deleted!');
    } catch {
      toast.error("There was a problem and your comment couldn't be deleted");
    }
  }

  if (
    post.author.id !== user!.id &&
    !user!.rank!.permissions.websiteManageGuestbook
  ) {
    return null;
  }

  return (
    <>
      <span className="ml-2" style={{cursor: 'pointer'}} onClick={onToggle}>
        <Icon className="text-danger" type="trash" />
      </span>
      <Modal isOpen={showModal} toggle={onToggle}>
        <ModalHeader toggle={onToggle}>Are You Sure?</ModalHeader>
        <ModalBody>
          <h2>Are You Sure?</h2>
          <p>You are about to delete your comment.</p>
          <div style={{background: '#001726', borderRadius: 4, padding: 15}}>
            <p>"{post.content}"</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={onSubmit}>
            Yes, Delete Comment.
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
