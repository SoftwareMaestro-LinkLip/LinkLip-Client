import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
