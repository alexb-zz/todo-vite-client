// filepath: /Users/reneberdugo/code/my-todo-list/my-vite-client/src/App.jsx
import React, { useEffect, useState } from 'react';

import Task from './components/Task';
import { fetchTasks } from './api/tasks';
import TaskList from './components/TaskList';
import { useModal } from './contexts/ModalContext';
import Modal from './components/Modal';


function App() {
  const { isModalOpen, openModalHandler } = useModal();
 
 
  return (
    <>
    <div className='app flex flex-col justify-center items-center min-h-screen min-w-screen m-4 bg-gradient-to-b from-slate-800 to bg-slate-950 text-slate-300'>
    <div className='m-4 p-2 text-4xl text-slate-100/50'>My Todo List</div>
      <button id="open-modal-bttn" onClick={openModalHandler} className="flex flex-row justify-center items-center w-10 h-6 m-4 p-2 bg-green-500 rounded hover:bg-green-700">+</button>
      <TaskList/>
      {isModalOpen && (
            <Modal/>
          )} 
    </div>
    </>
  );
}

export default App;