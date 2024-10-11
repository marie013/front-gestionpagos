import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [cuit, setCuit] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (event) => {
    event.preventDefault();
    if (email && cuit && password) {
      // Here you would typically handle the login logic
      navigate('/home');

      // You can replace this with your actual login logic or navigation
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="number"
              placeholder="CUIT"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <a href="#" className="block text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-gradient-to-r from-blue-800 to-blue-900 text-white flex items-center justify-center">
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