import React from 'react';


// Desc: Backdrop component for modal 
import { useModal } from '../contexts/ModalContext';

const Backdrop = (props) => {
  const { closeModalHandler } = useModal();
  
  return (
    <div className='backdrop fixed inset-0 flex flex-col justify-center items-center h-screen w-screen bg-black' onClick={closeModalHandler} >
      {props.children}
    </div>
  )
};

export default Backdrop;