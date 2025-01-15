import React from 'react';


// Desc: Backdrop component for modal 
import { useModal } from '../contexts/ModalContext';

const Backdrop = (props) => {
  const { closeModal } = useModal();
  
  return (
    <div className='backdrop fixed inset-0 flex flex-col justify-center items-center h-screen w-screen bg-slate-900' onClick={closeModal} >
      {props.children}
    </div>
  )
};

export default Backdrop;