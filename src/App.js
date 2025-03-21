// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Dashboard from './components/Dashboard.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={
                  <>
                    <TaskForm />
                    <TaskList />
                  </>
                } />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </Router>
      </DndProvider>
    </Provider>
  );
}

export default App;
