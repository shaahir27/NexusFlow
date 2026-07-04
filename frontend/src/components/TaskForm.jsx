import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  return (
    <div className="task-form">
      <h2 style={{ marginTop: 0, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Create New Task</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            placeholder="What needs to be done?"
            onChange={onChange}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={onChange}
            style={{ flex: 1 }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={formData.dueDate}
            onChange={onChange}
            style={{ flex: 1 }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
