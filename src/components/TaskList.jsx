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
    
    console.log(data);
    
 // const tasksArray = Array.isArray(data.tasks) ? data.tasks : [];
 const tasksArray = data && Array.isArray(data.tasks) ? data.tasks : [];
 return (
    <>
        <ul className='tasklist flex flex-col justify-center items-center m-4 p-4 rounded-lg text-slate-300 min-h-2.5 border-2 border-slate-200/50 shadow-lg'>
                    {tasksArray.map((task) => (
                    <Task 
                        key={task.id} 
                        title={task.title} 
                        description={task.description} 
                        completed={task.completed}
                        creator={task.creator}
                        onToggleCompleted={(completed) => mutation.mutate({ id: task.id, completed })} />
                    ))}
        </ul>
    </>
 )
}
export default TaskList;