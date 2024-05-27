import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { authAxiosInstance } from '../../../utils/AxiosConfig';

const FinancingSimulator = () => {
  const [financingValue, setFinancingValue] = useState('');
  const [installments, setInstallments] = useState('');
  const [interestRate, setInterestRate] = useState('3.90');
  const [interestPeriod, setInterestPeriod] = useState('ao mês');
  const [amortizationType, setAmortizationType] = useState('Tabela Price');

  const handleSubmit = (e) => {
    e.preventDefault();
    financingSimulation();
  };

  const financingSimulation = async () => {
    try {
      const data = {
        amount: financingValue,
        duration_months: installments,
        tax: interestRate
      };

      console.log('Response', data);

      const response = await authAxiosInstance.post(
        '/simulations/financing-simulation/', data
      );
      console.log('Response', response.data);
      
    } catch (error) {
      console.error('Erro ao fazer simulação:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Simulador de Financiamentos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" data-tip="Insira o valor total do financiamento desejado.">Valor do financiamento:</label>
          <input
            type="number"
            value={financingValue}
            onChange={(e) => setFinancingValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="0,00"
          />
          <ReactTooltip place="right" type="dark" effect="solid" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" data-tip="Digite o número de parcelas que deseja pagar.">Número de parcelas:</label>
          <input
            type="number"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="0"
          />
          <ReactTooltip place="right" type="dark" effect="solid" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" data-tip="Escolha o tipo de amortização desejado. As parcelas Fixas (Tabela Price) são muito comuns nos financiamentos pessoais.">Tipo de Amortização:</label>
          <select
            value={amortizationType}
            onChange={(e) => setAmortizationType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Tabela Price">Tabela Price</option>
            <option value="SAC">SAC</option>
            <option value="SACRE">SACRE</option>
          </select>
          <ReactTooltip place="right" type="dark" effect="solid" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" data-tip="Informe a taxa de administração do financiamento.">Taxa de administração:</label>
          <input
            type="text"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            value={interestPeriod}
            onChange={(e) => setInterestPeriod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          >
            <option value="ao mês">ao mês</option>
            <option value="ao ano">ao ano</option>
          </select>
          <ReactTooltip place="right" type="dark" effect="solid" />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Simular Financiamento
        </button>
      </form>
    </div>
  );
};

export default FinancingSimulator;
