import { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import { useQueryClient, useMutation } from '@tanstack/react-query'; // Import useQueryClient
import { deleteTask } from '../api/tasks';

function Task({ id, title, creator, completed, onToggleCompleted }) {
  const [isDone, setIsDone] = useState(completed);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsDone(completed);
  }, [completed]);
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  
  const handleCheckboxChange = () => {
    const newCompleted = !isDone;
    setIsDone(newCompleted);
    onToggleCompleted(newCompleted);
  };
    
  const openDeleteModalHandler = (event) => {
    event.preventDefault();
    const taskId = event.currentTarget.getAttribute('task-id');
    const taskTitle = event.currentTarget.getAttribute('task-title');
    const creator = event.currentTarget.getAttribute('creator');

    openModal(
      <form onSubmit={(e) => handleDeleteFormSubmit(e, taskId, creator)}>
        <div className='flex flex-col justify-center items-center'>
          <div name='taskTitle' className='p-2 m-2 text-size-6xl text-2xl text-amber-white '>{taskTitle}</div>
        </div> 
        <input type='hidden' name='creator' value={creator} />
        <button type='submit' className='flex flex-row justify-center items-center w-20 h-10 p-2 m-2 border-2 border-white rounded-lg'>Yes</button>  
      </form>
    );
  }
  const handleDeleteFormSubmit = async (event, taskId, creator) => {
    event.preventDefault();
    const taskTitle = event.target.querySelector('[name="taskTitle"]').textContent;
      
    const task = { taskId: taskId, creator: creator };
    console.log('task deleted :', task);
    try {
      await deleteTask(task); // Using mutateAsync with async/await
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    queryClient.invalidateQueries(['tasks']);
    closeModal();
  }

  return (
    <li key={id} className='flex items-center m-2 p-2 min-w-96 bg-gradient-to-b from-slate-900 to bg-slate-950 rounded-lg text-slate-400 border-2 border-slate-600/50 shadow-lg'>
      <div className='flex fle-col justify-center items-center min-w-80'> 
        <div className='p-2 m-2 text-size-6xl text-2xl text-amber-400 '>{title}</div>
      </div>
      <input 
          className='form-checkbox h-4 w-6 m-2 p-2'
            type="checkbox" 
            checked={isDone} 
            onChange={handleCheckboxChange}
        />
      <button task-id={id} task-title={title} creator={creator} onClick={openDeleteModalHandler} className='flex justify-center items-center h-4 w-6 bg-red-600' >x</button>
    </li>
  );
}

export default Task;