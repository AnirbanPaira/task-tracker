// src/features/tasks/tasksSlice.js
import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { loadTasks, saveTasks } from '../../utils/localStorage';

// Define the task entity adapter
const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    // Sort by order first (for drag and drop)
    if (a.order !== b.order) return a.order - b.order;
    // Then by created date
    return new Date(b.createdAt) - new Date(a.createdAt);
  },
});

// Initial state with filter, search, and history for undo/redo
const initialState = tasksAdapter.getInitialState({
  filter: 'all', // 'all', 'completed', 'active'
  searchTerm: '',
  history: {
    past: [],
    future: [],
  },
  categories: [], // Available task categories
  selectedCategory: null,
});

// Load tasks from localStorage if available
const savedTasks = loadTasks();
const preloadedState = savedTasks ? 
  { ...initialState, ...tasksAdapter.setAll(initialState, savedTasks.entities) } : 
  initialState;

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: preloadedState,
  reducers: {
    // Add a new task
    addTask: {
      reducer: (state, action) => {
        // Save current state to history for undo
        state.history.past.push(tasksAdapter.getSelectors().selectAll(state));
        state.history.future = [];
        
        tasksAdapter.addOne(state, action.payload);
        saveTasks(tasksAdapter.getSelectors().selectAll(state));
      },
      prepare: (taskData) => ({
        payload: {
          id: nanoid(),
          title: taskData.title,
          description: taskData.description || '',
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          priority: taskData.priority || 'medium', // 'low', 'medium', 'high'
          category: taskData.category || null,
          order: taskData.order || 0,
        },
      }),
    },
    
    // Toggle task completion status
    toggleTask: (state, action) => {
      // Save current state to history for undo
      state.history.past.push(tasksAdapter.getSelectors().selectAll(state));
      state.history.future = [];
      
      const task = state.entities[action.payload];
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        saveTasks(tasksAdapter.getSelectors().selectAll(state));
      }
    },
    
    // Update a task
    updateTask: (state, action) => {
      // Save current state to history for undo
      state.history.past.push(tasksAdapter.getSelectors().selectAll(state));
      state.history.future = [];
      
      const { id, ...changes } = action.payload;
      tasksAdapter.updateOne(state, {
        id,
        changes: {
          ...changes,
          updatedAt: new Date().toISOString(),
        },
      });
      saveTasks(tasksAdapter.getSelectors().selectAll(state));
    },
    
    // Delete a task
    removeTask: (state, action) => {
      // Save current state to history for undo
      state.history.past.push(tasksAdapter.getSelectors().selectAll(state));
      state.history.future = [];
      
      tasksAdapter.removeOne(state, action.payload);
      saveTasks(tasksAdapter.getSelectors().selectAll(state));
    },
    
    // Update task order (for drag and drop)
    reorderTasks: (state, action) => {
      // Save current state to history for undo
      state.history.past.push(tasksAdapter.getSelectors().selectAll(state));
      state.history.future = [];
      
      const { taskId, newOrder } = action.payload;
      const allTasks = tasksAdapter.getSelectors().selectAll(state);
      
      // Update orders for all affected tasks
      allTasks.forEach(task => {
        if (task.id === taskId) {
          tasksAdapter.updateOne(state, {
            id: taskId,
            changes: { order: newOrder },
          });
        } else if (
          (task.order >= newOrder && task.order < allTasks.find(t => t.id === taskId).order) ||
          (task.order <= newOrder && task.order > allTasks.find(t => t.id === taskId).order)
        ) {
          // Shift other tasks accordingly
          const shiftDirection = newOrder > task.order ? -1 : 1;
          tasksAdapter.updateOne(state, {
            id: task.id,
            changes: { order: task.order + shiftDirection },
          });
        }
      });
      
      saveTasks(tasksAdapter.getSelectors().selectAll(state));
    },
    
    // Set filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    // Set search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    
    // Set selected category
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    
    // Add a category
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    
    // Remove a category
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(category => category !== action.payload);
      // Remove the category from tasks
      Object.values(state.entities).forEach(task => {
        if (task.category === action.payload) {
          task.category = null;
        }
      });
    },
    
    // Undo action
    undo: (state) => {
      if (state.history.past.length > 0) {
        const lastState = state.history.past.pop();
        state.history.future.unshift(tasksAdapter.getSelectors().selectAll(state));
        
        // Reset the state
        tasksAdapter.removeAll(state);
        lastState.forEach(task => {
          tasksAdapter.addOne(state, task);
        });
        
        saveTasks(tasksAdapter.getSelectors().selectAll(state));
      }
    },
    
    // Redo action
    redo: (state) => {
      if (state.history.future.length > 0) {
        const nextState = state.history.future.shift();
        state.history.past.push(tasksAdapter.getSelectors().selectAll(state));
        
        // Reset the state
        tasksAdapter.removeAll(state);
        nextState.forEach(task => {
          tasksAdapter.addOne(state, task);
        });
        
        saveTasks(tasksAdapter.getSelectors().selectAll(state));
      }
    },
  },
});

// Export actions
export const {
  addTask,
  toggleTask,
  updateTask,
  removeTask,
  reorderTasks,
  setFilter,
  setSearchTerm,
  setSelectedCategory,
  addCategory,
  removeCategory,
  undo,
  redo,
} = tasksSlice.actions;

// Selectors
const selectors = tasksAdapter.getSelectors((state) => state.tasks);

// Custom selectors
export const selectAllTasks = selectors.selectAll;
export const selectTaskById = selectors.selectById;

// Filter tasks based on filter, search term, and category
export const selectFilteredTasks = (state) => {
  const allTasks = selectors.selectAll(state);
  const { filter, searchTerm, selectedCategory } = state.tasks;
  
  return allTasks.filter(task => {
    // Filter by status
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'active' && task.completed) return false;
    
    // Filter by search term
    if (searchTerm && 
        !task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    
    // Filter by category
    if (selectedCategory && task.category !== selectedCategory) return false;
    
    return true;
  });
};

// Select tasks stats for dashboard
export const selectTasksStats = (state) => {
  const allTasks = selectors.selectAll(state);
  const completedTasks = allTasks.filter(task => task.completed);
  
  return {
    total: allTasks.length,
    completed: completedTasks.length,
    active: allTasks.length - completedTasks.length,
    completionRate: allTasks.length > 0 ? 
      (completedTasks.length / allTasks.length) * 100 : 0,
    byPriority: {
      high: allTasks.filter(task => task.priority === 'high').length,
      medium: allTasks.filter(task => task.priority === 'medium').length,
      low: allTasks.filter(task => task.priority === 'low').length,
    },
    byCategory: state.tasks.categories.reduce((acc, category) => {
      acc[category] = allTasks.filter(task => task.category === category).length;
      return acc;
    }, {}),
  };
};

export default tasksSlice.reducer;