import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { FiTrash2, FiCheck, FiClock, FiPlayCircle } from 'react-icons/fi';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  const toggleStatus = () => {
    let newStatus = 'pending';
    if (task.status === 'pending') newStatus = 'in-progress';
    else if (task.status === 'in-progress') newStatus = 'completed';
    else newStatus = 'pending';

    updateTask(task._id, { status: newStatus });
  };

  const StatusIcon = () => {
    if (task.status === 'completed') return <FiCheck />;
    if (task.status === 'in-progress') return <FiPlayCircle />;
    return <FiClock />;
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <div>
          <h3 className="task-title" style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
            {task.title}
          </h3>
          <div className="task-badges">
            <span className={`badge badge-${task.status}`}>
              {task.status.replace('-', ' ')}
            </span>
            <span className={`badge priority-${task.priority}`}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>
      
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      <div className="task-actions">
        <button 
          className="btn-icon complete" 
          onClick={toggleStatus}
          title="Toggle Status"
        >
          <StatusIcon />
        </button>
        <button 
          className="btn-icon delete" 
          onClick={() => deleteTask(task._id)}
          title="Delete Task"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
