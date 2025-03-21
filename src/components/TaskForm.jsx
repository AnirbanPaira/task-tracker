import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addTask, updateTask, addCategory } from '../features/tasks/tasksSlice';

const TaskForm = ({ editTask = null, onCancel = null }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.tasks);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Set form fields if editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || '');
      setPriority(editTask.priority || 'medium');
      setCategory(editTask.category || '');
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (editTask) {
      dispatch(
        updateTask({
          id: editTask.id,
          title,
          description,
          priority,
          category: category || null,
        })
      );
      if (onCancel) onCancel();
    } else {
      dispatch(
        addTask({
          title,
          description,
          priority,
          category: category || null,
        })
      );
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory.trim()));
      setCategory(newCategory.trim());
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  // Style objects
  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #eaecef',
    },
    heading: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#333',
      position: 'relative',
      paddingBottom: '10px',
    },
    headingAfter: {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '40px',
      height: '3px',
      backgroundColor: '#3a6ff7',
      borderRadius: '3px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '6px',
      color: '#555',
    },
    input: (isFocused) => ({
      width: '100%',
      padding: '10px 14px',
      border: isFocused ? '2px solid #3a6ff7' : '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxShadow: isFocused ? '0 0 0 3px rgba(58, 111, 247, 0.15)' : 'none',
    }),
    textarea: (isFocused) => ({
      width: '100%',
      padding: '10px 14px',
      border: isFocused ? '2px solid #3a6ff7' : '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none',
      resize: 'vertical',
      minHeight: '80px',
      boxShadow: isFocused ? '0 0 0 3px rgba(58, 111, 247, 0.15)' : 'none',
    }),
    select: (isFocused) => ({
      width: '100%',
      padding: '10px 14px',
      appearance: 'none',
      border: isFocused ? '2px solid #3a6ff7' : '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      cursor: 'pointer',
      boxShadow: isFocused ? '0 0 0 3px rgba(58, 111, 247, 0.15)' : 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23606060%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px top 50%',
      backgroundSize: '10px auto',
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
      gap: '16px',
      marginBottom: '16px',
    },
    flex: {
      display: 'flex',
    },
    flexEnd: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px',
    },
    button: {
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
    },
    primaryButton: {
      backgroundColor: '#3a6ff7',
      color: 'white',
      boxShadow: '0 2px 5px rgba(58, 111, 247, 0.3)',
    },
    primaryButtonHover: {
      backgroundColor: '#2855d9',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(58, 111, 247, 0.4)',
    },
    secondaryButton: {
      backgroundColor: '#f0f2f5',
      color: '#555',
      border: '1px solid #ddd',
    },
    secondaryButtonHover: {
      backgroundColor: '#e6e8ec',
      color: '#333',
    },
    categoryInput: (isFocused) => ({
      flex: 1,
      padding: '10px 14px',
      border: isFocused ? '2px solid #3a6ff7' : '1px solid #ddd',
      borderRight: 'none',
      borderRadius: '8px 0 0 8px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none',
    }),
    categorySelect: (isFocused) => ({
      flex: 1,
      padding: '10px 14px',
      appearance: 'none',
      border: isFocused ? '2px solid #3a6ff7' : '1px solid #ddd',
      borderRight: 'none',
      borderRadius: '8px 0 0 8px',
      fontSize: '14px',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      cursor: 'pointer',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23606060%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px top 50%',
      backgroundSize: '10px auto',
    }),
    newButton: {
      padding: '10px 14px',
      backgroundColor: '#f0f2f5',
      color: '#555',
      borderRadius: '0 8px 8px 0',
      cursor: 'pointer',
      border: '1px solid #ddd',
      transition: 'all 0.2s ease',
    },
    newButtonHover: {
      backgroundColor: '#e6e8ec',
      color: '#333',
    },
    addButton: {
      padding: '10px 14px',
      backgroundColor: '#3a6ff7',
      color: 'white',
      borderRadius: '0 8px 8px 0',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s ease',
    },
    addButtonHover: {
      backgroundColor: '#2855d9',
    }
  };

  // Button hover states
  const [buttonHoverStates, setButtonHoverStates] = useState({
    submit: false,
    cancel: false,
    new: false,
    add: false
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {editTask ? 'Edit Task' : 'Add New Task'}
        <span style={styles.headingAfter}></span>
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title <span style={{color: '#f56565'}}>*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setFocusedInput('title')}
            onBlur={() => setFocusedInput(null)}
            style={styles.input(focusedInput === 'title')}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setFocusedInput('description')}
            onBlur={() => setFocusedInput(null)}
            style={styles.textarea(focusedInput === 'description')}
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        
        <div style={styles.grid}>
          <div>
            <label htmlFor="priority" style={styles.label}>
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              onFocus={() => setFocusedInput('priority')}
              onBlur={() => setFocusedInput(null)}
              style={styles.select(focusedInput === 'priority')}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" style={styles.label}>
              Category
            </label>
            {showCategoryInput ? (
              <div style={styles.flex}>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onFocus={() => setFocusedInput('newCategory')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.categoryInput(focusedInput === 'newCategory')}
                  placeholder="New category name"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  onMouseEnter={() => setButtonHoverStates({...buttonHoverStates, add: true})}
                  onMouseLeave={() => setButtonHoverStates({...buttonHoverStates, add: false})}
                  style={{
                    ...styles.addButton,
                    ...(buttonHoverStates.add ? styles.addButtonHover : {})
                  }}
                >
                  Add
                </button>
              </div>
            ) : (
              <div style={styles.flex}>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onFocus={() => setFocusedInput('category')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.categorySelect(focusedInput === 'category')}
                >
                  <option value="">No Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowCategoryInput(true)}
                  onMouseEnter={() => setButtonHoverStates({...buttonHoverStates, new: true})}
                  onMouseLeave={() => setButtonHoverStates({...buttonHoverStates, new: false})}
                  style={{
                    ...styles.newButton,
                    ...(buttonHoverStates.new ? styles.newButtonHover : {})
                  }}
                >
                  New
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div style={styles.flexEnd}>
          {editTask && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              onMouseEnter={() => setButtonHoverStates({...buttonHoverStates, cancel: true})}
              onMouseLeave={() => setButtonHoverStates({...buttonHoverStates, cancel: false})}
              style={{
                ...styles.button,
                ...styles.secondaryButton,
                ...(buttonHoverStates.cancel ? styles.secondaryButtonHover : {})
              }}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            onMouseEnter={() => setButtonHoverStates({...buttonHoverStates, submit: true})}
            onMouseLeave={() => setButtonHoverStates({...buttonHoverStates, submit: false})}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...(buttonHoverStates.submit ? styles.primaryButtonHover : {})
            }}
          >
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;