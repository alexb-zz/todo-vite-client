

export const fetchTasks = async () => {
    const response = await fetch('http://localhost:9000/api/tasks');
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return response.json();
  };

export const createTask = async (task) => {
    console.log(task);
    const response = await fetch('http://localhost:9000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

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
  