import { useTasks } from '../context/TaskContext';

export default function StatsBar() {
  const { tasks } = useTasks();

  const stats = tasks.reduce(
    (acc, t) => {
      acc.total++;
      if (t.status === 'todo') acc.todo++;
      if (t.status === 'in-progress') acc.inProgress++;
      if (t.status === 'completed') acc.completed++;
      return acc;
    },
    { total: 0, todo: 0, inProgress: 0, completed: 0 }
  );

  const completionPct = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-num">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat">
        <span className="stat-num todo">{stats.todo}</span>
        <span className="stat-label">To Do</span>
      </div>
      <div className="stat">
        <span className="stat-num in-progress">{stats.inProgress}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat">
        <span className="stat-num completed">{stats.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat progress-stat">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completionPct}%` }} />
        </div>
        <span className="stat-label">{completionPct}% done</span>
      </div>
    </div>
  );
}
