// src/components/PriorityBadge.tsx
import React from 'react';

const PriorityBadge = ({ priority }) => {
  let bgColor = 'bg-yellow-100 text-yellow-800';
  let displayPriority = priority;

  if (!priority) {
    displayPriority = 'medium'; // Default priority if undefined
  }

  if (displayPriority === 'high') {
    bgColor = 'bg-red-100 text-red-800';
  } else if (displayPriority === 'low') {
    bgColor = 'bg-green-100 text-green-800';
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${bgColor}`}>
      {displayPriority.charAt(0).toUpperCase() + displayPriority.slice(1)}
    </span>
  );
};

export default PriorityBadge;
