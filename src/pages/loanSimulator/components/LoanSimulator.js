import React, { useState } from 'react';
import { authAxiosInstance as axios } from '../../../utils/AxiosConfig'

const LoanSimulator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const [interestRate, setInterestRate] = useState('3.90');
  const [interestPeriod, setInterestPeriod] = useState('ao mês');
  const [amortizationType, setAmortizationType] = useState('Tabela Price');
  const [simulationDetails, setSimulationDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    loanSimulation();
  };

  const loanSimulation = async () => {
    setLoading(true);
    try {
      let calculation_method = '';
      if (amortizationType.toLocaleLowerCase().includes('price')) {
        calculation_method = 'price';
      } else if (amortizationType.toLocaleLowerCase().includes('sac')) {
        calculation_method = 'sac';
      }

      const data = {
        amount: loanAmount,
        duration_months: installments,
        tax: interestRate,
        calculation_method,
      };

      const response = await axios.post(
        '/simulations/loan-simulation/', data
      );

      setSimulationDetails(response.data);
    } catch (error) {
      console.error('Erro ao fazer simulação:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (details) => {
    let totalParcela = 0;
    let totalAmortizacao = 0;
    let totalJuros = 0;
    let totalSaldoDevedor = 0;

    details.forEach(detail => {
      totalParcela += detail.parcela;
      totalAmortizacao += detail.amortizacao;
      totalJuros += detail.juros;
      totalSaldoDevedor += detail.saldo_devedor;
    });

    return {
      totalParcela,
      totalAmortizacao,
      totalJuros,
      totalSaldoDevedor,
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Simulador de Empréstimos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Valor do empréstimo:</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="0,00"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Número de parcelas:</label>
          <input
            type="number"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tipo de Amortização:</label>
          <select
            value={amortizationType}
            onChange={(e) => setAmortizationType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Tabela Price">Tabela Price</option>
            <option value="SAC">SAC</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Taxa de juros:</label>
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
            <option disabled value="ao ano">ao ano</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Simulando...' : 'Simular Empréstimo'}
        </button>
      </form>
      {simulationDetails && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Banco Recomendado</h3>
          <p className="text-lg mb-2">Nome: {simulationDetails.bank_name}</p>
          <p className="text-lg mb-4">Localização: {simulationDetails.bank_location}</p>
          <h3 className="text-xl font-bold mb-4">Detalhes da Simulação</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-center">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">#</th>
                  <th className="py-2 px-4 border-b">Parcelas</th>
                  <th className="py-2 px-4 border-b">Amortizações</th>
                  <th className="py-2 px-4 border-b">Juros</th>
                  <th className="py-2 px-4 border-b">Saldo Devedor</th>
                </tr>
              </thead>
              <tbody>
                {simulationDetails.details.map((detail, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{detail.parcela.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{detail.amortizacao.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{detail.juros.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{detail.saldo_devedor.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2 px-4 border-b">»</td>
                  <td className="py-2 px-4 border-b">{calculateTotals(simulationDetails.details).totalParcela.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{calculateTotals(simulationDetails.details).totalAmortizacao.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{calculateTotals(simulationDetails.details).totalJuros.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">« TOTAIS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanSimulator;
