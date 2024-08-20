import React, { createContext, useState } from 'react';

export const AutContext = createContext();

export const AutProvider = ({ children }) => {
  const [esAtuenticado, setEsAutenticado] = useState(false);

  const login = () => {
    setEsAutenticado(true);
  };

  const logout = () => {
    setEsAutenticado(false);
  };

  return (
    <AutContext.Provider value={{ esAtuenticado, login, logout }}>
      {children}
    </AutContext.Provider>
  );
};
