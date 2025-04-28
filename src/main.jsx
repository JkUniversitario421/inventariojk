import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CadastroMovel from './components/CadastroMovel';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MovelPage from './pages/MovelPage';
import EditarMovel from './pages/EditarMovel';
import RequireAuth from './components/RequireAuth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><CadastroMovel /></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/editar/:id" element={<RequireAuth><EditarMovel /></RequireAuth>} />
      <Route path="/movel/:id" element={<MovelPage />} />
    </Routes>
  </BrowserRouter>
);
