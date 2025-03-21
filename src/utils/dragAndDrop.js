// src/utils/dragAndDrop.js
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    // Update order property for each task
    return result.map((item, index) => ({
      ...item,
      order: index,
    }));
  };