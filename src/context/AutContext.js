import React, { createContext, useState } from 'react';

export const AutContext = createContext();

export const AutProvider = ({ children }) => {
  const [esAutenticado, setEsAutenticado] = useState(false);

  const login = () => setEsAutenticado(true);
  const logout = () => setEsAutenticado(false);

  return (
    <AutContext.Provider value={{ esAutenticado, login, logout }}>
      {children}
    </AutContext.Provider>
  );
};

export default AutProvider;
