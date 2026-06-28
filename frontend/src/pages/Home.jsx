import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import StatsBar from '../components/StatsBar';

export default function Home() {
  const { tasks, loading, error, filters, fetchTasks } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks(filters);
    // eslint-disable-next-line
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">✅</span>
            <span className="logo-text">TickOff</span>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + New Task
          </button>
        </div>
      </header>

      <main className="main-content">
        <StatsBar />
        <FilterBar />

        {loading && (
          <div className="state-container">
            <div className="spinner" />
            <p>Loading tasks…</p>
          </div>
        )}

        {error && !loading && (
          <div className="state-container error-state">
            <span className="state-icon">⚠️</span>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => fetchTasks(filters)}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="state-container empty-state">
            <span className="state-icon">📋</span>
            <h3>No tasks yet</h3>
            <p>Create your first task to get started.</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + New Task
            </button>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <TaskForm task={editingTask} onClose={handleCloseForm} />
      )}
    </div>
  );
}
