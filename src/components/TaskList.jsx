import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Task from './Task';
import { fetchTasks, updateTask } from '../api/tasks';

function TaskList() {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    });

    const mutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(['tasks']);
        },
      });
    
 // const tasksArray = Array.isArray(data.tasks) ? data.tasks : [];
 const tasksArray = data && Array.isArray(data.tasks) ? data.tasks : [];
 return (
    <>
      <ul className='tasklist flex flex-col justify-center items-center m-4 p-4 rounded-lg text-amber-200 min-h-2.5 border-2 border-slate-900 bg-gradient-to-b from-slate-800 toshadow-lg'>
                  {tasksArray.map((task) => (
          <Task 
              key={task.id} 
              id={task.id}
              title={task.title}  
              completed={task.completed}
              creator={task.creator}
              onToggleCompleted={(completed) => mutation.mutate({ id: task.id, completed })} />
          ))}
      </ul>
    </>
 )
}

export default TaskList;