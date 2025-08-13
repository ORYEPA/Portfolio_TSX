import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CertificatesPage from './pages/CertificatesPage';
import GetStarted from "./pages/GetStarted";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certificates" element={<CertificatesPage />} />
      <Route path="/get-started" element={<GetStarted />} />      
    </Routes>
  </BrowserRouter>
);

export default App;
