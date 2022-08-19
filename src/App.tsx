import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AOS from 'aos';
import { RecoilRoot } from 'recoil';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  });

  return (
    <div>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
