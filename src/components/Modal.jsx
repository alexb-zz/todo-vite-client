import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Card from './Card';
import Backdrop from './Backdrop';
import { createTask } from '../api/tasks';
import { useModal } from '../contexts/ModalContext';

const Modal = (props) => {
  const { isModalOpen, closeModalHandler } = useModal();
  const queryClient = useQueryClient();
  const [ placeHolder,  setPlaceHolder ]  = useState("Enter task");
  
  const mutation = useMutation({ mutationFn: createTask });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const taskTitle = event.target.taskTitle.value;
    const taskCreator = event.target.creator.value;    
    const task = { title: taskTitle, creator: taskCreator };

    try {
        await mutation.mutateAsync(task); // Using mutateAsync with async/await
        console.log('Task created successfully');
      } catch (error) {
        console.error('Error creating task:', error);
      }
        queryClient.invalidateQueries(['tasks']);
        closeModalHandler();
};
  //hard coded creator value for now
  const CREATOR ="675745bb4c7573896b1d2832";

  const handleFocus = () => setPlaceHolder(" ")
  
  const content = <React.Fragment>
    { isModalOpen && 
      <Backdrop>
        <Card>
            <form onSubmit={handleFormSubmit}>
              <div className='flex flex-row justify-end items-center'>
                <input type='text' 
                name="taskTitle" 
                className='bg-slate-950 cursor-pointer focus:border-collapse w-64 h-10 p-2 m-2 rounded-lg' 
                placeholder={placeHolder}
                onFocus={handleFocus} />
                <input type='hidden' name='creator' value={CREATOR} />  
                <button type='submit' className='flex flex-row justify-center items-center w-20 h-10 p-2 m-2 border-2 border-white rounded-lg'>Add</button>
              </div>
            </form>
        </Card>
      </Backdrop>
    }            
  </React.Fragment>

  return ReactDOM.createPortal(
    content, document.getElementById('backdrop-hook')
  );

}
export default Modal;