import React, { useState } from 'react';
import logoImage from '../../assets/logoBank.jpg';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './index.css';
import { authAxiosInstance } from '../../utils/AxiosConfig';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [step, setStep] = useState(1);

  const handleRegister = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log(email, password, name, telephone, monthlyIncome, cpf, birthDate, pixKey);

    const cpfFormatted = cpf.replace(/\D/g, '');

    try {
      const response = await authAxiosInstance.post('auth/register', {
        email,
        password,
        name,
        telephone,
        monthly_income: monthlyIncome,
        cpf: cpfFormatted,
        birth_date: birthDate,
        pix_key: pixKey
      });

      if (response.status === 201) {
        setIsRegistered(true);
      } else {
        alert("Erro ao cadastrar!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar!");
    }
  };

  const handleNextStep = () => {
    setStep(2);
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-custom-blue flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-5xl font-extrabold text-white">
              Cadastro
            </h2>
          </div>
          <form onSubmit={handleRegister} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Nome</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Senha</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      minLength={7}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-white text-sm font-medium mb-2">Confirmar Senha</label>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      minLength={7}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-2xl font-medium rounded-xl text-white bg-gradient-to-r from-green-400 to-yellow-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400"
                  >
                    Continuar Cadastro <FaArrowRight className="ml-2" />
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="telephone" className="block text-white text-sm font-medium mb-2">Telefone</label>
                    <input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      required
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="birth-date" className="block text-white text-sm font-medium mb-2">Data de Nascimento</label>
                    <input
                      id="birth-date"
                      name="birth-date"
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="cpf" className="block text-white text-sm font-medium mb-2">CPF</label>
                    <input
                      id="cpf"
                      name="cpf"
                      type="text"
                      required
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="pix-key" className="block text-white text-sm font-medium mb-2">Chave PIX</label>
                    <input
                      id="pix-key"
                      name="pix-key"
                      type="text"
                      required
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="monthly-income" className="block text-white text-sm font-medium mb-2">Renda Mensal</label>
                    <input
                      id="monthly-income"
                      name="monthly-income"
                      type="number"
                      required
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="appearance-none rounded-xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-green-400 sm:text-sm my-2"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="group flex justify-center py-3 px-4 border border-transparent text-2xl font-medium rounded-xl text-white bg-gradient-to-r from-green-400 to-yellow-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400"
                    >
                      <FaArrowLeft className="mr-2" /> Voltar
                    </button>
                    <button
                      type="submit"
                      className="group flex justify-center py-3 px-4 border border-transparent text-2xl font-medium rounded-xl text-white bg-gradient-to-r from-green-400 to-yellow-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400"
                    >
                      Cadastrar
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
          <div className="flex justify-center mt-4">
            <a href="/login" className="font-medium text-custom-gray hover:text-green-500 underline text-sm">
              Já tenho uma conta
            </a>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-indigo-600 relative">
        <div className="absolute inset-0 overflow-hidden">
          <img className="w-full h-full object-cover" src={logoImage} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Register;
