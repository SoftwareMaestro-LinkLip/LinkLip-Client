import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Join from './pages/Join';
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
          <Route path="/oauth2/redirect/" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/join" element={<Join />}></Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
