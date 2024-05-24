// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('token', 'seu_token_de_autenticacao');
    } else {
      localStorage.removeItem('token');
    }
  }, [isAuthenticated]);

  const authLogin = () => {
    setIsAuthenticated(true);
  };

  const authLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authLogin, authLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);