import React from 'react';
import { ModalProvider, useModal } from './contexts/ModalContext';
import Modal from './components/Modal';
import { useQueryClient, useMutation } from '@tanstack/react-query'; // Import useQueryClient

import Task from './components/Task';
import { fetchTasks } from './api/tasks';
import TaskList from './components/TaskList';
import { createTask } from './api/tasks';



function App() {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();

  const handleOpenModal = () => {
    openModal(
      <form onSubmit={handleFormSubmit} >
        <div className='flex flex-row justify-end items-center'>
          <input type='text' 
          name="taskTitle" 
          className='bg-slate-900 cursor-pointer focus:border-collapse w-64 h-10 p-2 m-2 text-amber-200 rounded-lg' />
          <input type='hidden' name='creator' value={CREATOR} />  
          <button type='submit' className='flex flex-row justify-center items-center w-20 h-10 p-2 m-2 border-2 border-white rounded-lg'>Add</button>
        </div>
      </form>
    );
  };

  const queryClient = useQueryClient();
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
          closeModal();
    };
    //hard coded creator value for now
    const CREATOR ="675745bb4c7573896b1d2832";

 
 
  return (
    <>
    <div className='app flex flex-col justify-center items-center min-h-screen min-w-screen m-4 bg-gradient-to-b from-slate-850 to bg-slate-950 text-slate-300'>
    <div className='m-4 p-2 text-4xl text-amber-500'>My Todo List</div>
    <div className='flex flex-row justify-end place-items-end min-w-96'>
      <button id="open-modal-bttn" onClick={handleOpenModal} className="flex flex-row justify-center items-center w-10 h-6 m-4 p-2 bg-amber-500 rounded hover:bg-amber-600">+</button>
    </div>
      <TaskList/>
      {isModalOpen && (
            <Modal action='create'/>
          )} 
    </div>
    </>
  );
}

export default App;