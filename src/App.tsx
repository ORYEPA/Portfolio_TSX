import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CertificatesPage from './pages/CertificatesPage';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certificates" element={<CertificatesPage />} />
      
    </Routes>
  </BrowserRouter>
);

export default App;
