import { useState, useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';

const TaskModal = ({ task, onClose }) => {
  const { updateTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : '', // Format for date input
    status: task.status,
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(task._id, formData);
    onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={onChange}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Priority</label>
              <select name="priority" className="form-control" value={formData.priority} onChange={onChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Status</label>
              <select name="status" className="form-control" value={formData.status} onChange={onChange}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={onChange}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose} style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-primary)' }}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
