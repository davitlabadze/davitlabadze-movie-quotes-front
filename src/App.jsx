import React from 'react';
import './App.css';
import FrontendLayout from './layouts/FrontendLayout';
import AdminPanel from './layouts/AdminPanel';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<FrontendLayout to='/quote' />} />
        <Route path='/adminpanle' element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
