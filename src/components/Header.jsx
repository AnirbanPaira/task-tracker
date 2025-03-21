import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.tsx';
import FilterBar from './FilterBar.tsx';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { undo, redo } from '../features/tasks/tasksSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector(state => state.tasks);
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;

  const styles = {
    header: {
      padding: isMobile ? '16px 12px' : '16px 20px',
      backgroundColor: '#f3f4f9',
      borderBottom: '1px solid #e5e7eb',
      width: '100%',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden', // Prevents children from overflowing
    },
    titleSection: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: '20px',
      gap: isMobile ? '12px' : '0',
      width: '100%',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#111827',
      margin: '0',
    },
    navContainer: {
      marginLeft: isMobile ? '0' : '32px',
    },
    navLinks: {
      display: 'flex',
      gap: '24px',
      padding: '0',
      margin: '0',
      listStyle: 'none',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: '800',
      fontSize: '16px',
      transition: 'color 0.2s',
      padding: '4px 0',
    },
    navLinkHover: {
      color: '#1F2937',
      borderBottom: '2px solid #4B5563',
    },
    controlsContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      gap: '20px',
      width: '100%',
      boxSizing: 'border-box',
    },
    row: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '16px',
      width: '100%',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      alignItems: 'stretch',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: isMobile ? '16px' : '0',
      order: isMobile ? '3' : '1',
      flexWrap: 'wrap',
    },
    button: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: '500',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s',
    },
    buttonEnabled: {
      backgroundColor: '#e2e8f0',
      color: '#1F2937',
      cursor: 'pointer',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    buttonDisabled: {
      backgroundColor: '#f1f5f9',
      color: '#9ca3af',
      cursor: 'not-allowed',
      opacity: '0.7',
    },
    searchSection: {
      flex: isMobile ? '1 1 100%' : '1',
      maxWidth: '100%',
      order: isMobile ? '1' : '2',
      boxSizing: 'border-box',
    },
    filterSection: {
      flex: isMobile ? '1 1 100%' : '0 0 auto',
      order: isMobile ? '2' : '3',
      boxSizing: 'border-box',
    },
    divider: {
      height: isMobile ? '1px' : '0',
      backgroundColor: '#e5e7eb',
      margin: isMobile ? '16px 0' : '0',
      width: '100%',
      display: isMobile ? 'block' : 'none',
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Task Manager</h1>
          <nav style={styles.navContainer}>
            <ul style={styles.navLinks}>
              <li>
                <Link
                  to="/"
                  style={styles.navLink}
                  onMouseOver={(e) => {
                    e.target.style.color = styles.navLinkHover.color;
                    e.target.style.borderBottom = styles.navLinkHover.borderBottom;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = styles.navLink.color;
                    e.target.style.borderBottom = 'none';
                  }}
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  style={styles.navLink}
                  onMouseOver={(e) => {
                    e.target.style.color = styles.navLinkHover.color;
                    e.target.style.borderBottom = styles.navLinkHover.borderBottom;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = styles.navLink.color;
                    e.target.style.borderBottom = 'none';
                  }}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div style={styles.divider}></div>
        
        <div style={styles.controlsContainer}>
          {isMobile ? (
            <>
              <div style={styles.searchSection}>
                <SearchBar />
              </div>
              
              <div style={styles.filterSection}>
                <FilterBar />
              </div>
              
              <div style={styles.buttonContainer}>
                <button
                  onClick={() => dispatch(undo())}
                  disabled={!canUndo}
                  style={{
                    ...styles.button,
                    ...(canUndo ? styles.buttonEnabled : styles.buttonDisabled)
                  }}
                  aria-label="Undo"
                  title="Undo"
                >
                  <span style={{ fontSize: '16px' }}>↩️</span> Undo
                </button>
                
                <button
                  onClick={() => dispatch(redo())}
                  disabled={!canRedo}
                  style={{
                    ...styles.button,
                    ...(canRedo ? styles.buttonEnabled : styles.buttonDisabled)
                  }}
                  aria-label="Redo"
                  title="Redo"
                >
                  <span style={{ fontSize: '16px' }}>↪️</span> Redo
                </button>
              </div>
            </>
          ) : (
            <div style={styles.row}>
              <div style={styles.buttonContainer}>
                <button
                  onClick={() => dispatch(undo())}
                  disabled={!canUndo}
                  style={{
                    ...styles.button,
                    ...(canUndo ? styles.buttonEnabled : styles.buttonDisabled)
                  }}
                  aria-label="Undo"
                  title="Undo"
                >
                  <span style={{ fontSize: '16px' }}>↩️</span> Undo
                </button>
                
                <button
                  onClick={() => dispatch(redo())}
                  disabled={!canRedo}
                  style={{
                    ...styles.button,
                    ...(canRedo ? styles.buttonEnabled : styles.buttonDisabled)
                  }}
                  aria-label="Redo"
                  title="Redo"
                >
                  <span style={{ fontSize: '16px' }}>↪️</span> Redo
                </button>
              </div>
              
              <div style={styles.searchSection}>
                <SearchBar />
              </div>
              
              <div style={styles.filterSection}>
                <FilterBar />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;