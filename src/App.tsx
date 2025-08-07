import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CertificatesPage from './pages/CertificatesPage';
import NotesPage from './pages/NotesPage';
import NotePage from './pages/NotePage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certificates" element={<CertificatesPage />} />
      <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:slug" element={<NotePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
