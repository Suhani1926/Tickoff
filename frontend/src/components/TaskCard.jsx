import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const PRIORITY_COLORS = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const STATUS_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', completed: 'Completed' };

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isOverdue(dateStr, status) {
  if (!dateStr || status === 'completed') return false;
  return new Date(dateStr) < new Date();
}

export default function TaskCard({ task, onEdit }) {
  const { updateTask, deleteTask } = useTasks();
  const [deleting, setDeleting] = useState(false);

  const handleStatusChange = async (e) => {
    await updateTask(task._id, { ...task, status: e.target.value });
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;
    setDeleting(true);
    await deleteTask(task._id);
    setDeleting(false);
  };

  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className={`task-card priority-${task.priority} ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-card-header">
        <div className="task-meta">
          <span className="priority-dot" style={{ background: PRIORITY_COLORS[task.priority] }} title={`${task.priority} priority`} />
          <span className={`status-badge status-${task.status}`}>{STATUS_LABELS[task.status]}</span>
        </div>
        <div className="task-actions">
          <button className="icon-btn" onClick={() => onEdit(task)} title="Edit" aria-label="Edit task">
            ✏️
          </button>
          <button className="icon-btn danger" onClick={handleDelete} disabled={deleting} title="Delete" aria-label="Delete task">
            🗑️
          </button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        {task.dueDate && (
          <span className={`due-date ${overdue ? 'overdue' : ''}`}>
            {overdue ? '⚠️' : '📅'} {formatDate(task.dueDate)}
          </span>
        )}

        <select
          className={`status-select status-${task.status}`}
          value={task.status}
          onChange={handleStatusChange}
          aria-label="Change status"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
