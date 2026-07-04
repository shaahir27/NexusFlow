import { useContext, useState } from 'react';
import { format, parseISO, isPast, isToday } from 'date-fns';
import TaskContext from '../context/TaskContext';
import TaskModal from './TaskModal';

const TaskList = ({ searchQuery, priorityFilter }) => {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState(null);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', gridColumn: '1 / -1' }}>
        <h3 style={{ color: 'var(--text-secondary)' }}>No tasks found</h3>
        <p>You're all caught up! Create a task to get started.</p>
      </div>
    );
  }

  // Filter by search query AND priority
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  const pendingTasks = filteredTasks.filter(t => t.status === 'pending');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in_progress');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--priority-high)';
      case 'medium': return 'var(--priority-medium)';
      case 'low': return 'var(--priority-low)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--status-completed)';
      case 'in_progress': return 'var(--status-progress)';
      default: return 'var(--status-pending)';
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = parseISO(dateString);
    let color = 'var(--text-secondary)';
    
    if (isPast(date) && !isToday(date)) color = 'var(--accent-danger)';
    else if (isToday(date)) color = 'var(--accent-peach)';

    return (
      <span style={{ fontSize: '0.8rem', color, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '10px' }}>
        📅 {format(date, 'MMM d, yyyy')}
      </span>
    );
  };

  const renderTaskCard = (task) => (
    <div key={task._id} className="kanban-card" onClick={() => setEditingTask(task)}>
      <div className="kanban-card-header">
        <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority}
        </span>
        <button
          className="btn-delete-icon"
          onClick={(e) => { e.stopPropagation(); deleteTask(task._id); }}
        >
          &times;
        </button>
      </div>
      <h4 style={{ margin: '10px 0 5px 0' }}>{task.title}</h4>
      {task.description && <p className="kanban-desc">{task.description}</p>}
      
      <div className="kanban-footer" onClick={(e) => e.stopPropagation()}>
        {formatDueDate(task.dueDate)}
        <select
          className="form-control status-select"
          value={task.status}
          onChange={(e) => updateTask(task._id, { status: e.target.value })}
          style={{ borderColor: getStatusColor(task.status), color: getStatusColor(task.status) }}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <div className="kanban-board">
        {/* Pending Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3>Pending <span className="task-count">{pendingTasks.length}</span></h3>
          </div>
          <div className="kanban-column-content">
            {pendingTasks.map(renderTaskCard)}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3>In Progress <span className="task-count">{inProgressTasks.length}</span></h3>
          </div>
          <div className="kanban-column-content">
            {inProgressTasks.map(renderTaskCard)}
          </div>
        </div>

        {/* Completed Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3>Completed <span className="task-count">{completedTasks.length}</span></h3>
          </div>
          <div className="kanban-column-content">
            {completedTasks.map(renderTaskCard)}
          </div>
        </div>
      </div>

      {editingTask && (
        <TaskModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </>
  );
};

export default TaskList;
