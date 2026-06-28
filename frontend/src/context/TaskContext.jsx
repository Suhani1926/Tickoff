import { createContext, useContext, useReducer, useCallback } from 'react';
import { taskAPI } from '../utils/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: { status: 'all', priority: 'all', search: '' },
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false, error: null };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t._id === action.payload._id ? action.payload : t)),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t._id !== action.payload) };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async (filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const params = {};
      if (filters.status && filters.status !== 'all') params.status = filters.status;
      if (filters.priority && filters.priority !== 'all') params.priority = filters.priority;
      if (filters.search) params.search = filters.search;

      const res = await taskAPI.getAll(params);
      dispatch({ type: 'SET_TASKS', payload: res.data.tasks });
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to fetch tasks';
      dispatch({ type: 'SET_ERROR', payload: msg });
      toast.error(msg);
    }
  }, []);

  const createTask = useCallback(async (data) => {
    try {
      const res = await taskAPI.create(data);
      dispatch({ type: 'ADD_TASK', payload: res.data.task });
      toast.success('Task created!');
      return { success: true };
    } catch (err) {
      const errors = err.response?.data?.errors;
      const msg = Array.isArray(errors) ? errors[0]?.msg || errors[0] : (err.response?.data?.error || 'Failed to create task');
      toast.error(msg);
      return { success: false, error: msg };
    }
  }, []);

  const updateTask = useCallback(async (id, data) => {
    try {
      const res = await taskAPI.update(id, data);
      dispatch({ type: 'UPDATE_TASK', payload: res.data.task });
      toast.success('Task updated!');
      return { success: true };
    } catch (err) {
      const errors = err.response?.data?.errors;
      const msg = Array.isArray(errors) ? errors[0]?.msg || errors[0] : (err.response?.data?.error || 'Failed to update task');
      toast.error(msg);
      return { success: false, error: msg };
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await taskAPI.delete(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to delete task';
      toast.error(msg);
      return { success: false };
    }
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  return (
    <TaskContext.Provider value={{ ...state, fetchTasks, createTask, updateTask, deleteTask, setFilters }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};
