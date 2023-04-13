import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const DeleteModal = (props) => {

    return (
        <Modal show={props.modal} onHide={props.hideDeleteModal}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
    
          <Modal.Body>
            <p>{props.body}</p>
          </Modal.Body>
    
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.hideDeleteModal()}>Cancel</Button>
            <Button variant="primary" onClick={() => props.deleteUserInfo()}>Delete</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default DeleteModal