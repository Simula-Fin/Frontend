import React, { useState } from 'react';

const LoanRequest = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [accumulatedAssets, setAccumulatedAssets] = useState('');
  const [desiredInterestRate, setDesiredInterestRate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar a solicitação de empréstimo
  };

  const handleCancel = () => {
    // Limpar todos os campos do formulário
    setLoanAmount('');
    setLoanDuration('');
    setLoanPurpose('');
    setAccumulatedAssets('');
    setDesiredInterestRate('');
  };

  const formatCurrency = (value) => {
    return value.replace(/\D/g, '')
                .replace(/(\d)(\d{2})$/, '$1,$2')
                .replace(/(?=(\d{3})+(\D))\B/g, '.');
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(formatCurrency(e.target.value));
  };

  const handleAccumulatedAssetsChange = (e) => {
    setAccumulatedAssets(formatCurrency(e.target.value));
  };

  const handleNumberChange = (setState) => (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setState(value);
  };

  const loanPurposes = ['Viagem', 'Emergência', 'Doença', 'Compra específica', 'Outros'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Solicitar Empréstimo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Valor do Empréstimo:</label>
          <input
            type="text"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="0,00"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Duração do Empréstimo (em meses):</label>
          <input
            type="text"
            value={loanDuration}
            onChange={handleNumberChange(setLoanDuration)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Finalidade do Empréstimo:</label>
          <select
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione</option>
            {loanPurposes.map((purpose) => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Patrimônio Acumulado:</label>
          <input
            type="text"
            value={accumulatedAssets}
            onChange={handleAccumulatedAssetsChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="0,00"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Taxa de Juros Desejada (Opcional):</label>
          <div className="flex items-center">
            <input
              type="text"
              value={desiredInterestRate}
              onChange={handleNumberChange(setDesiredInterestRate)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="0"
            />
            <span className="ml-2">%</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md mr-2 hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Solicitar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanRequest;
