import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [cuit, setCuit] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para la autenticación
    if (email && cuit && password) {
      navigate('/app');
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Iniciar Sesión</h1>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />
          <input
            type="number"
            placeholder="CUIT"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)} required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
          <a href="#">¿Olvidaste tu contraseña?</a>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Para mantenerte conectado con nosotros, inicia sesión con tu información personal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
