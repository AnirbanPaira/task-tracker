// src/components/CategoryBadge.jsx
import React from 'react';

const CategoryBadge = ({ category }) => {
  // Generate a deterministic color based on the category name
  const getColorClass = (name) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-teal-100 text-teal-800',
    ];
    
    // Simple hash function to determine color index
    const hash = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colors[hash % colors.length];
  };
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getColorClass(category)}`}>
      {category}
    </span>
  );
};

export default CategoryBadge;