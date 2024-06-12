import React from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaListUl, FaMoneyCheckAlt, FaHandHoldingUsd, FaUser } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-gray-100 p-10 min-h-screen flex flex-col items-center justify-between">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-4 text-center">Conquiste os seus sonhos</h1>
        <p className="text-xl mb-6 text-center">Dê um salto em busca de novas aventuras. Obtenha já uma análise de crédito e venha realizar seus sonhos!</p>

        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4 text-center">Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/loan-request" className="bg-white border border-green-500 text-green-500 px-8 py-6 rounded-md text-lg hover:bg-green-500 hover:text-white hover-title flex flex-col items-center text-center">
              <FaDollarSign className="text-4xl mb-2" />
              <span className="font-bold">Solicitação de Empréstimo</span>
              <span className="text-sm mt-2">Solicite um empréstimo de forma rápida e fácil.</span>
            </Link>
            <Link to="/loan-opportunities" className="bg-white border border-green-500 text-green-500 px-8 py-6 rounded-md text-lg hover:bg-green-500 hover:text-white hover-title flex flex-col items-center text-center">
              <FaListUl className="text-4xl mb-2" />
              <span className="font-bold">Oportunidades de Empréstimo</span>
              <span className="text-sm mt-2">Explore diversas oportunidades de empréstimo.</span>
            </Link>
            <Link to="/consortium" className="bg-white border border-green-500 text-green-500 px-8 py-6 rounded-md text-lg hover:bg-green-500 hover:text-white hover-title flex flex-col items-center text-center">
              <FaMoneyCheckAlt className="text-4xl mb-2" />
              <span className="font-bold">Simulações de Consórcio</span>
              <span className="text-sm mt-2">Simule consórcios para diversas finalidades.</span>
            </Link>
            <Link to="/loan-simulator" className="bg-white border border-green-500 text-green-500 px-8 py-6 rounded-md text-lg hover:bg-green-500 hover:text-white hover-title flex flex-col items-center text-center">
              <FaHandHoldingUsd className="text-4xl mb-2" />
              <span className="font-bold">Simulações de Empréstimo</span>
              <span className="text-sm mt-2">Calcule simulações de empréstimo personalizadas.</span>
            </Link>
            <Link to="/financing" className="bg-white border border-green-500 text-green-500 px-8 py-6 rounded-md text-lg hover:bg-green-500 hover:text-white hover-title flex flex-col items-center text-center">
              <FaMoneyCheckAlt className="text-4xl mb-2" />
              <span className="font-bold">Simulações de Financiamento</span>
              <span className="text-sm mt-2">Faça simulações de financiamento de diferentes tipos.</span>
            </Link>
            <Link to="/profile" className="bg-white border border-green-500 text-green-500 px-8 py-6 rounded-md text-lg hover:bg-green-500 hover:text-white hover-title flex flex-col items-center text-center">
              <FaUser className="text-4xl mb-2" />
              <span className="font-bold">Perfil</span>
              <span className="text-sm mt-2">Gerencie seu perfil e informações pessoais.</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-center">Sobre o Projeto</h2>
        <p className="text-lg mb-4 text-center">
          Este projeto foi desenvolvido para ajudar as pessoas a realizarem seus sonhos através de análises de crédito precisas e simulações financeiras detalhadas. 
          Com a nossa plataforma, você pode explorar diversas opções de consórcios, financiamentos e empréstimos, tudo de maneira simples e intuitiva.
        </p>
        <p className="text-lg mb-4 text-center">
          A motivação por trás deste projeto é proporcionar uma ferramenta eficaz que permita aos usuários tomar decisões financeiras informadas, 
          ajudando-os a alcançar seus objetivos e a melhorar sua qualidade de vida. Utilizamos tecnologias modernas e seguras para garantir a melhor experiência possível.
        </p>
        <p className="text-lg mb-4 text-center">
          Navegue pelas funcionalidades acima para descobrir todas as possibilidades que oferecemos. Estamos aqui para apoiar você em cada passo do seu caminho rumo à conquista dos seus sonhos.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
