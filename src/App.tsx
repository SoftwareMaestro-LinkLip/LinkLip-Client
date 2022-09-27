import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AOS from 'aos';
import { RecoilRoot } from 'recoil';
import './assets/css/style.scss';

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
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/oauth2/redirect/:jwt" element={<Login />}></Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
