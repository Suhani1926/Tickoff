import { useTasks } from '../context/TaskContext';

export default function FilterBar() {
  const { filters, setFilters, fetchTasks } = useTasks();

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchTasks(newFilters);
  };

  const handleSearch = (e) => {
    handleChange('search', e.target.value);
  };

  const clearFilters = () => {
    const reset = { status: 'all', priority: 'all', search: '' };
    setFilters(reset);
    fetchTasks(reset);
  };

  const isFiltered = filters.status !== 'all' || filters.priority !== 'all' || filters.search;

  return (
    <div className="filter-bar">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks…"
          value={filters.search}
          onChange={handleSearch}
          className="search-input"
          aria-label="Search tasks"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => handleChange('status', e.target.value)}
        aria-label="Filter by status"
        className="filter-select"
      >
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => handleChange('priority', e.target.value)}
        aria-label="Filter by priority"
        className="filter-select"
      >
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {isFiltered && (
        <button className="btn btn-ghost" onClick={clearFilters}>
          Clear
        </button>
      )}
    </div>
  );
}
