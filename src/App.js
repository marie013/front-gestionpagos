import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegistrarPago from './pages/RegistrarPago';
import Clientes from './pages/clientes/Clientes';
import RegistrarCliente from './pages/clientes/RegistrarCliente';
import Proveedores from './pages/Proveedores';
import Login from './components/Login';
import Comprobantes from './pages/comprobantes';
import { AutContext } from './context/AutContext';
import EditarCliente from './pages/clientes/EditarCliente';
import RegistrarFactura from './pages/Facturas/RegistrarFactura';
import Facturas from './pages/Facturas/ListarFacturas';
import Entidad from './pages/Entidad';

function App() {
  const { esAutenticado } = useContext(AutContext);

  const ProtectedRoute = ({ children }) => {
    return esAutenticado ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      {esAutenticado && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/entidad" element={<ProtectedRoute><Entidad /></ProtectedRoute>} />
          <Route path="/registrarPago" element={<ProtectedRoute><RegistrarPago /></ProtectedRoute>} />
          <Route path="/clientes" element={<><Clientes /></>} />
          <Route path="/editar/:id" element={<ProtectedRoute><EditarCliente /></ProtectedRoute>} />
          <Route path="/registrarCliente" element={<ProtectedRoute><RegistrarCliente /></ProtectedRoute>} />
          <Route path="/registrar-proveedor" element={<ProtectedRoute><RegistrarCliente /></ProtectedRoute>} />
          <Route path="/pagos" element={<ProtectedRoute><Comprobantes /></ProtectedRoute>} />
          <Route path="/registrarFactura" element={<ProtectedRoute><RegistrarFactura /></ProtectedRoute>} />
          <Route path="/facturas" element={<Facturas />} />
          <Route path="/proveedores" element={<ProtectedRoute><Proveedores /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
