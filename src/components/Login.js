import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AutContext } from '../context/AutContext';

const Login = () => {
  const [correoElectronicoEntidad, setcorreoElectronicoEntidad] = useState('');
  const [cuitEntidad, setCuitEntidad] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login } = useContext(AutContext); 
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!correoElectronicoEntidad || !cuitEntidad || !contrasena) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/gestion-de-pagos/iniciarSesion', {
        correoElectronicoEntidad: correoElectronicoEntidad,
        cuitEntidad: cuitEntidad,
        contrasena: contrasena,
      });

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso', response.data);
        login(); 
        navigate('/home');
      } else {
        alert('Credenciales incorrectas o entidad no registrada.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error al iniciar sesión. Intente nuevamente.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-100 font-sans">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl flex">
        <div className="w-1/2 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={correoElectronicoEntidad}
              onChange={(e) => setcorreoElectronicoEntidad(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              type="number"
              placeholder="CUIT"
              value={cuitEntidad}
              onChange={(e) => setCuitEntidad(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-900 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white flex items-center justify-center">
          <div className="px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">¡Bienvenido de nuevo!</h1>
            <p className="mb-6">Para mantenerte conectado con nosotros, inicia sesión con tu información personal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
