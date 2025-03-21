// Updated Header Component to Solve Overlap Issue
import React from 'react';
import SearchBar from './SearchBar.tsx';
import FilterBar from './FilterBar.tsx';

const Header = () => {
  const styles = {
    header: {
      padding: '16px 20px',
      backgroundColor: '#f3f4f9',
      borderBottom: '1px solid #e5e7eb',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    controlsContainer: {
      display: 'flex',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
      gap: '16px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '16px',
    },
    searchSection: {
      flex: '1',
      maxWidth: window.innerWidth < 768 ? '100%' : '300px',
    },
    filterSection: {
      flex: window.innerWidth < 768 ? '1' : '0 0 auto',
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Task Manager</h1>
        
        <div style={styles.controlsContainer}>
          <div style={styles.searchSection}>
            <SearchBar />
          </div>
          
          <div style={styles.filterSection}>
            <FilterBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
