// FilterBar Component
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setFilter, setSelectedCategory } from '../features/tasks/tasksSlice';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { filter, selectedCategory, categories } = useAppSelector((state:any) => state.tasks);
  const [focusedSelect, setFocusedSelect] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value === 'all' ? null : e.target.value));
  };

  // Common styles for both select elements
  const getSelectStyles = (selectName) => ({
    appearance: 'none' as React.CSSProperties['appearance'],
    padding: '10px 34px 10px 18px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333333',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: focusedSelect === selectName ? '2px solid #4a7dff' : '2px solid rgba(210, 220, 250, 0.8)',
    borderRadius: '28px',
    boxShadow: focusedSelect === selectName 
      ? '0 0 0 4px rgba(58, 111, 247, 0.25), 0 6px 12px rgba(0, 0, 0, 0.1)' 
      : '0 4px 8px rgba(0, 0, 0, 0.08)',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23606060%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px top 50%',
    backgroundSize: '10px auto',
    minWidth: '140px',
  });

  const styles = {
    container: {
      display: 'flex',
      flexDirection: windowWidth < 768 ? 'column' : 'row',
      gap: '16px',
    },
    selectWrapper: {
      position: 'relative' as React.CSSProperties['position'],
      marginBottom: windowWidth < 768 ? '8px' : '0',
    },
    filterSelect: getSelectStyles('filter'),
    categorySelect: getSelectStyles('category'),
    selectLabel: {
      position: 'absolute' as 'absolute',
      top: '-8px',
      left: '12px',
      fontSize: '10px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#4a7dff',
      padding: '2px 8px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
      zIndex: 1,
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as 'uppercase',
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.selectWrapper}>
        <span style={styles.selectLabel}>
          Status
        </span>
        <select
          value={filter}
          onChange={handleFilterChange}
          onFocus={() => setFocusedSelect('filter')}
          onBlur={() => setFocusedSelect(null)}
          style={styles.filterSelect}
          aria-label="Filter by status"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={styles.selectWrapper}>
        <span style={styles.selectLabel}>
          Category
        </span>
        <select
          value={selectedCategory || 'all'}
          onChange={handleCategoryChange}
          onFocus={() => setFocusedSelect('category')}
          onBlur={() => setFocusedSelect(null)}
          style={styles.categorySelect}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;