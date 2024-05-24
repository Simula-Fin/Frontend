import React, { useState } from 'react';
import logoImage from './logoBank.jpg'; // Importa a imagem local
import './index.css';
import { useAuth } from '../../utils/AuthContext'
import { Navigate } from 'react-router-dom'; // Importa o componente Navigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authLogin, authLogout, isAuthenticated } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const login = (email, password) => {
    authLogin();
  };

  if (isAuthenticated) {
    return <Navigate to="/consortium" replace />;
  }

  return (
    <div className="min-h-screen flex"> 
      {/* Parte Esquerda - Login */}
      <div className="w-1/2 bg-custom-blue flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-5xl font-extrabold text-white">
              Faça seu login
            </h2>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-white text-sm font-medium mb-2">Login</label>
                <input 
                  id="email-address" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400  sm:text-sm my-2" 
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400  sm:text-sm my-2" 
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-custom-gray hover:text-green-500 underline">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-2xl font-medium rounded-xl text-white bg-gradient-to-r from-green-400 to-yellow-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400">
                Entrar
              </button> 
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <a href="#" className="font-medium text-custom-gray hover:text-green-500 underline text-sm">
              Ainda não tenho uma conta
            </a>
          </div>
        </div>
      </div>

      {/* Parte Direita - Logo */}
      <div className="w-1/2 bg-indigo-600 relative">
        <div className="absolute inset-0 overflow-hidden">
          <img className="w-full h-full object-cover" src={logoImage} alt="Logo" /> 
        </div>
      </div>
    </div>
  );
};

export default Login;
