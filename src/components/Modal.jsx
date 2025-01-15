import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import Backdrop from './Backdrop';
import { useModal } from '../contexts/ModalContext';

const Modal = (props) => {
  const { isModalOpen, closeModal, modalContent } = useModal();

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <Backdrop>
      <Card>
        <div className="modal-content h-40 w-120">
          {modalContent}
        </div>
        <button onClick={closeModal} className="close-button">x</button>
      </Card>
    </Backdrop>,
    document.getElementById('backdrop-hook')
  );
};

export default Modal;