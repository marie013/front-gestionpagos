import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pagos from './pages/Pagos';
import Proveedores from './pages/Proveedores';
import RegistrarProveedor from './pages/RegistrarProveedor';
import Login from './components/Login';
import Comprobantes from './pages/comprobantes';

function App() {
  const location = useLocation();
  const isAuthenticated = location.pathname !== '/';

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <div className={isAuthenticated ? "main-content" : "login-container"} >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/registrar-proveedor" element={<RegistrarProveedor />} />
          <Route path="/comprobantes" element={<Comprobantes />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
