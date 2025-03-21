// SearchBar Component
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSearchTerm } from '../features/tasks/tasksSlice';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state: any) => state.tasks.searchTerm);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const styles = {
    searchContainer: {
      position: 'relative' as 'relative',
      width: '100%',
      maxWidth: window.innerWidth < 768 ? '100%' : '300px',
    },
    searchInput: {
      width: '100%',
      padding: '12px 40px 12px 18px',
      fontSize: '14px',
      fontWeight: '400',
      color: '#333333',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: isFocused ? '2px solid #4a7dff' : '2px solid rgba(210, 220, 250, 0.8)',
      borderRadius: '28px',
      boxShadow: isFocused
        ? '0 0 0 4px rgba(58, 111, 247, 0.25), 0 6px 12px rgba(0, 0, 0, 0.1)'
        : '0 4px 8px rgba(0, 0, 0, 0.08)',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    searchIcon: {
      position: 'absolute' as 'absolute',
      top: '50%',
      right: '15px',
      transform: 'translateY(-50%)',
      color: '#6b7280',
      pointerEvents: 'none' as 'none',
      fontSize: '16px',
    },
    clearButton: {
      position: 'absolute' as 'absolute',
      right: '40px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      fontSize: '14px',
      display: searchTerm ? 'block' : 'none',
      padding: '4px',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
    }
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.searchInput}
        aria-label="Search tasks"
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          style={styles.clearButton}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      <div style={styles.searchIcon}>
        🔍
      </div>
    </div>
  );
};

export default SearchBar;