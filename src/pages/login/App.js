import React from 'react';
import logoImage from './logoBank.jpg'; // Importa a imagem local
import './App.css';

const Login = () => {
  return (
    <div className="min-h-screen flex"> 

      {/* Parte Esquerda - Login */}
      <div className="w-1/2 bg-custom-blue flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Faça seu login</h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Login</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2" placeholder="Login" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2" placeholder="Password" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-yellow-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Parte Direita - Logo */}
      <div className="w-1/2 bg-indigo-600 relative">
        <div className="absolute inset-0 overflow-hidden">
          <img className="w-full h-full object-cover" src={logoImage} alt="Logo" /> {/* Utiliza a imagem local */}
        </div>
      </div>
    </div>
  );
};

export default Login;
