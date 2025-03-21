// src/components/TaskList.jsx
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectFilteredTasks, reorderTasks } from '../features/tasks/tasksSlice';
import TaskItem from './TaskItem.tsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { exportTasks, importTasks } from '../utils/localStorage';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectFilteredTasks);
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex === destinationIndex) return;
    
    dispatch(
      reorderTasks({
        taskId: result.draggableId,
        newOrder: destinationIndex,
      })
    );
  };
  
  const handleExport = () => {
    const exportData = exportTasks();
    if (exportData) {
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'task-tracker-export.json';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };
  
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          const success = importTasks(content);
          if (success) {
            window.location.reload();
          } else {
            alert('Failed to import tasks. The file may be corrupted or in an invalid format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  
  // Enhanced styles for a more beautiful UI
  const containerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.02)',
    padding: '28px',
    maxWidth: '100%',
    margin: '0 auto',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(229, 231, 235, 0.8)',
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '26px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(229, 231, 235, 0.6)',
  };
  
  const titleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1f2937',
    position: 'relative',
    display: 'inline-block',
  };
  
  const titleBeforeStyle = {
    content: '""',
    position: 'absolute',
    width: '30px',
    height: '3px',
    backgroundColor: '#3b82f6',
    bottom: '-8px',
    left: '0',
    borderRadius: '2px',
  };
  
  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
  };
  
  const buttonBaseStyle = {
    padding: '8px 16px',
    borderRadius: '8px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };
  
  const exportButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#10b981',
  };
  
  const exportButtonHoverStyle = {
    ...exportButtonStyle,
    backgroundColor: '#059669',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
  };
  
  const importButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#3b82f6',
  };
  
  const importButtonHoverStyle = {
    ...importButtonStyle,
    backgroundColor: '#2563eb',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
  };
  
  const emptyMessageStyle = {
    textAlign: 'center',
    padding: '40px 0',
    color: '#9ca3af',
    fontSize: '16px',
    fontStyle: 'italic',
    background: 'rgba(243, 244, 246, 0.5)',
    borderRadius: '10px',
    border: '2px dashed #e5e7eb',
    margin: '10px 0',
  };
  
  const taskListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  };
  
  const [exportHovered, setExportHovered] = useState(false);
  const [importHovered, setImportHovered] = useState(false);
  
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          Your Tasks
          <div style={titleBeforeStyle}></div>
        </h2>
        <div style={buttonContainerStyle}>
          <button
            onClick={handleExport}
            style={exportHovered ? exportButtonHoverStyle : exportButtonStyle}
            title="Export tasks"
            onMouseEnter={() => setExportHovered(true)}
            onMouseLeave={() => setExportHovered(false)}
          >
            Export
          </button>
          <button
            onClick={handleImport}
            style={importHovered ? importButtonHoverStyle : importButtonStyle}
            title="Import tasks"
            onMouseEnter={() => setImportHovered(true)}
            onMouseLeave={() => setImportHovered(false)}
          >
            Import
          </button>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <div style={emptyMessageStyle}>
          No tasks found. Add some tasks to get started!
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={taskListStyle}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          transform: snapshot.isDragging ? provided.draggableProps.style.transform : "none",
                          boxShadow: snapshot.isDragging ? "0 10px 20px rgba(0, 0, 0, 0.1)" : "none",
                          transition: "box-shadow 0.2s ease",
                        }}
                      >
                        <TaskItem
                          task={task}
                          isEditing={task.id === editingTaskId}
                          onEditStart={() => setEditingTaskId(task.id)}
                          onEditEnd={() => setEditingTaskId(null)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskList;
