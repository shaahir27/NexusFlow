import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import AuthContext from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user, api } = useContext(AuthContext);

  // Set up auth header for API calls
  const getAuthHeader = () => {
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
  };

  // Fetch tasks
  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await api.get('/tasks', getAuthHeader());
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  // Add Task
  const addTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData, getAuthHeader());
      setTasks([res.data, ...tasks]);
      toast.success('Task created successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to create task');
    }
  };

  // Update Task (Full update including status, title, description, etc)
  const updateTask = async (id, updatedData) => {
    try {
      const res = await api.put(`/tasks/${id}`, updatedData, getAuthHeader());
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      toast.success('Task updated!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, getAuthHeader());
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
