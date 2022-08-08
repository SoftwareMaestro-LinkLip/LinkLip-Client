import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AOS from 'aos';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
