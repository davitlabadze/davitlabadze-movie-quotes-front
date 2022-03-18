import React from 'react';
import './App.css';
import FrontendLayout from './layouts/FrontendLayout';
import AdminPanel from './layouts/AdminPanel';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './adminPanel/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<FrontendLayout to='/quote' />} />
        <Route path='/adminpanel/*' element={<AdminPanel />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
