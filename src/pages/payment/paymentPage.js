import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contract = location.state?.contract;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmPayment = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      navigate('/');
    }, 2000);
  };

  if (!contract) {
    return <p>Contrato não encontrado. Por favor, tente novamente.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Detalhes do Pagamento</h1>
        <div className="mb-4">
          <p className="text-lg font-semibold">Contrato ID:</p>
          <p>{contract.contract_id}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Nome do Devedor:</p>
          <p>{contract.borrower_name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Valor:</p>
          <p>{contract.amount}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Duração:</p>
          <p>{contract.duration} meses</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Taxa de Juros:</p>
          <p>{contract.interestRate}</p>
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold">Chave Pix para Pagamento:</p>
          <p className="bg-gray-100 p-2 rounded border border-gray-300">simulafin@hotmail.com</p>
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold">Informações Adicionais:</p>
          <ul className="list-disc pl-5">
            <li>O contrato foi baixado automaticamente para seu dispositivo.</li>
            <li>Você receberá atualizações sobre seu empréstimo por email e telefone.</li>
            <li>Nosso suporte entrará em contato com você para mais detalhes.</li>
          </ul>
        </div>
        <button 
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          onClick={handleConfirmPayment}
        >
          Confirmar Empréstimo
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Empréstimo Confirmado!</h2>
            <p>Entraremos em contato ao receber o pagamento.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;