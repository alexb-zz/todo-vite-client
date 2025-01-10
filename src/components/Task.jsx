///import classes from './Task.module.css';
import { useState, useEffect } from 'react';

function Task({ id, title, description, creator, completed, onToggleCompleted }) {
  const [isDone, setIsDone] = useState(completed);

  useEffect(() => {
    setIsDone(completed);
  }, [completed]);
  
  const handleCheckboxChange = () => {
    const newCompleted = !isDone;
    setIsDone(newCompleted);
    onToggleCompleted(newCompleted);
  };

  return (
    <li key={id} creator={creator} className='flex justify-between items-center m-2 p-2 min-w-96 bg-gradient-to-b from-slate-900 to bg-slate-950 rounded-lg text-slate-400 border-2 border-slate-200/50 shadow-lg'>
      <div className='flex fle-col justify-center items-center min-w-80'> 
      <div className='p-2 m-2 text-size-6xl text-2xl text-slate-100/50 '>{title}</div>
      </div>
        <input 
          className='form-checkbox h-7 w-7 m-2 p-2'
            type="checkbox" 
            checked={isDone} 
            onChange={handleCheckboxChange}
        />
      <div className='hidden'>{description}</div>
    </li>
  );
}

export default Task;