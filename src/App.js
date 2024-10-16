import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pagos from './pages/Pagos';
import Clientes from './pages/clientes/Clientes';
import RegistrarCliente from './pages/clientes/RegistrarCliente';
import RegistrarProveedor from './pages/RegistrarProveedor';
import Proveedores from './pages/Proveedores';
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
          <Route path="/registrarPago" element={<Pagos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/registrarCliente" element={<RegistrarCliente />} />
          <Route path="/registrar-proveedor" element={<RegistrarCliente />} />
          <Route path="/pagos" element={<Comprobantes />} />
          <Route path="/proveedores" element={<Proveedores />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
