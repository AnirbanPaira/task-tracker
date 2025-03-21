// src/components/TaskItem.jsx
import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { toggleTask, removeTask } from '../features/tasks/tasksSlice.js';
import TaskForm from './TaskForm.jsx';
import PriorityBadge from './PriorityBadge.tsx';
import CategoryBadge from './CategoryBadge.tsx';
import { toast } from 'react-toastify';

const TaskItem = ({ task, isEditing, onEditStart, onEditEnd }) => {
  const dispatch = useAppDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [editHovered, setEditHovered] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);
  
  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };
  
  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(removeTask(task.id));
      toast.success('Task deleted successfully!');
    }
  };
  
  // Styles for editing mode
  const editingContainerStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  };
  
  // Styles for normal mode
  const containerStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: task.completed ? '#f9fafb' : '#ffffff',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const containerHoverStyle = {
    ...containerStyle,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  };
  
  const [isHovered, setIsHovered] = useState(false);
  
  // If task is priority high, add a subtle left border indicator
  if (task.priority === 'high') {
    containerStyle.borderLeft = '4px solid #ef4444';
    containerHoverStyle.borderLeft = '4px solid #ef4444';
    containerStyle.paddingLeft = '14px';
    containerHoverStyle.paddingLeft = '14px';
  } else if (task.priority === 'medium') {
    containerStyle.borderLeft = '4px solid #f59e0b';
    containerHoverStyle.borderLeft = '4px solid #f59e0b';
    containerStyle.paddingLeft = '14px';
    containerHoverStyle.paddingLeft = '14px';
  } else if (task.priority === 'low') {
    containerStyle.borderLeft = '4px solid #10b981';
    containerHoverStyle.borderLeft = '4px solid #10b981';
    containerStyle.paddingLeft = '14px';
    containerHoverStyle.paddingLeft = '14px';
  }
  
  const flexContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
  };
  
  const checkboxContainerStyle = {
    marginRight: '12px',
    marginTop: '4px',
  };
  
  const checkboxStyle = {
    height: '20px',
    width: '20px',
    cursor: 'pointer',
    accentColor: '#3b82f6',
  };
  
  const contentContainerStyle = {
    flexGrow: 1,
    minWidth: 0,
  };
  
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  };
  
  const titleStyle = {
    fontWeight: 500,
    fontSize: '18px',
    color: task.completed ? '#9ca3af' : '#111827',
    textDecoration: task.completed ? 'line-through' : 'none',
    cursor: 'pointer',
    padding: '2px 0',
    transition: 'color 0.2s ease',
  };
  
  const titleHoverStyle = {
    ...titleStyle,
    color: task.completed ? '#6b7280' : '#2563eb',
  };
  
  const [titleHovered, setTitleHovered] = useState(false);
  
  const detailsContainerStyle = {
    marginTop: '8px',
    animation: 'fadeIn 0.3s ease-in-out',
  };
  
  const descriptionStyle = {
    color: task.completed ? '#9ca3af' : '#4b5563',
    fontSize: '15px',
    lineHeight: '1.5',
    marginBottom: '8px',
  };
  
  const metadataStyle = {
    marginTop: '8px',
    fontSize: '12px',
    color: '#6b7280',
  };
  
  const actionContainerStyle = {
    display: 'flex',
    gap: '4px',
    marginLeft: '8px',
  };
  
  const buttonBaseStyle = {
    padding: '6px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
  };
  
  const editButtonStyle = {
    ...buttonBaseStyle,
    color: '#2563eb',
    backgroundColor: editHovered ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
  };
  
  const deleteButtonStyle = {
    ...buttonBaseStyle,
    color: '#dc2626',
    backgroundColor: deleteHovered ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
  };
  
  if (isEditing) {
    return (
      <div style={editingContainerStyle}>
        <TaskForm
          editTask={task}
          onCancel={onEditEnd}
        />
      </div>
    );
  }
  
  return (
    <div 
      style={isHovered ? containerHoverStyle : containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={flexContainerStyle}>
        <div style={checkboxContainerStyle}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            style={checkboxStyle}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
        </div>
        
        <div style={contentContainerStyle}>
          <div style={headerStyle}>
            <h3 
              style={titleHovered ? titleHoverStyle : titleStyle}
              onClick={() => setShowDetails(!showDetails)}
              onMouseEnter={() => setTitleHovered(true)}
              onMouseLeave={() => setTitleHovered(false)}
            >
              {task.title}
            </h3>
            
            <PriorityBadge priority={task.priority} />
            
            {task.category && (
              <CategoryBadge category={task.category} />
            )}
          </div>
          
          {(showDetails || task.description) && (
            <div style={detailsContainerStyle}>
              {task.description && (
                <p style={descriptionStyle}>
                  {task.description}
                </p>
              )}
              
              <div style={metadataStyle}>
                Created: {new Date(task.createdAt).toLocaleString()}
                {task.updatedAt !== task.createdAt && (
                  <span> · Updated: {new Date(task.updatedAt).toLocaleString()}</span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={actionContainerStyle}>
          <button
            onClick={onEditStart}
            style={editButtonStyle}
            aria-label={`Edit "${task.title}"`}
            title="Edit"
            onMouseEnter={() => setEditHovered(true)}
            onMouseLeave={() => setEditHovered(false)}
          >
            ✏️
          </button>
          
          <button
            onClick={handleRemove}
            style={deleteButtonStyle}
            aria-label={`Delete "${task.title}"`}
            title="Delete"
            onMouseEnter={() => setDeleteHovered(true)}
            onMouseLeave={() => setDeleteHovered(false)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
