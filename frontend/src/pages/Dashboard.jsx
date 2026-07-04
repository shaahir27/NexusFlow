import { useState, useContext } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import AuthContext from '../context/AuthContext';
import TaskContext from '../context/TaskContext';

// We wrap TaskForm in a Modal for the new UI
const CreateTaskModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--border-color)' }}>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div style={{ padding: '1rem' }}>
          <TaskForm />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      
      {/* SaaS Dashboard Header */}
      <header className="dashboard-header">
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Welcome back, {user?.name.split(' ')[0]} 👋</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '5px 0 0 0' }}>
            Here is what's happening with your projects today.
          </p>
        </div>
        
        <div style={{ flex: '1 1 400px', maxWidth: '500px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: '20px', flex: 1 }}
          />
          <select 
            className="form-control"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{ borderRadius: '20px', width: 'auto', cursor: 'pointer' }}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div>
          <button onClick={() => setIsCreating(true)} className="btn btn-primary" style={{ borderRadius: '20px', width: '100%' }}>
            + Create Task
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Tasks</div>
          <div className="kpi-value">{tasks.length}</div>
        </div>
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--status-pending)' }}>
          <div className="kpi-title">Pending</div>
          <div className="kpi-value">{pendingCount}</div>
        </div>
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--status-progress)' }}>
          <div className="kpi-title">In Progress</div>
          <div className="kpi-value">{inProgressCount}</div>
        </div>
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--status-completed)' }}>
          <div className="kpi-title">Completed</div>
          <div className="kpi-value">{completedCount}</div>
        </div>
      </div>

      {/* Kanban Board Area */}
      <main style={{ marginTop: '2rem' }}>
        <TaskList searchQuery={searchQuery} priorityFilter={priorityFilter} />
      </main>

      {isCreating && <CreateTaskModal onClose={() => setIsCreating(false)} />}
    </div>
  );
};

export default Dashboard;
