// src/utils/localStorage.js
export const loadTasks = () => {
    try {
      const serializedTasks = localStorage.getItem('tasks');
      if (serializedTasks === null) {
        return undefined;
      }
      return JSON.parse(serializedTasks);
    } catch (err) {
      console.error('Error loading tasks from localStorage', err);
      return undefined;
    }
  };
  
  export const saveTasks = (tasks) => {
    try {
      const serializedTasks = JSON.stringify({ entities: tasks });
      localStorage.setItem('tasks', serializedTasks);
    } catch (err) {
      console.error('Error saving tasks to localStorage', err);
    }
  };
  
  // Export/import functionality
  export const exportTasks = () => {
    try {
      const tasks = loadTasks();
      if (!tasks) return null;
      
      const exportData = JSON.stringify(tasks, null, 2);
      return exportData;
    } catch (err) {
      console.error('Error exporting tasks', err);
      return null;
    }
  };
  
  export const importTasks = (jsonData) => {
    try {
      const importedTasks = JSON.parse(jsonData);
      saveTasks(importedTasks.entities);
      return true;
    } catch (err) {
      console.error('Error importing tasks', err);
      return false;
    }
  };