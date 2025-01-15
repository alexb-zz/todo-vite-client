

export const fetchTasks = async () => {
    const response = await fetch('http://localhost:9000/api/tasks');
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return response.json();
  };

export const createTask = async (task) => {
    try {
    const response = await fetch('http://localhost:9000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok, ${errorData.message}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

export const updateTask = async ({ id, completed }) => {
    const response = await fetch(`http://localhost:9000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  export const deleteTask = async (task) => {
    const { taskId, creator } = task;
    try {
      const response = await fetch(`http://localhost:9000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ creator }),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        console.error('Server response:', errorText); // Log the server response
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };
  
  