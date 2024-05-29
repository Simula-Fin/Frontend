import React from 'react';
import { FaMoneyBillWave, FaPencilAlt } from 'react-icons/fa'; // Importando ícones

const CreditValueStep = ({ creditValue, setCreditValue, handleNext, handleBack }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Simulador de Consórcio</h2>
      <p className="mb-6 text-lg">Selecione o valor do crédito ou da parcela que melhor se adapta ao seu momento</p>
      <div className="flex items-center mb-4">
        <FaMoneyBillWave size={28} className="mr-3" />
        <label className="block text-xl text-gray-700">Valor do Crédito:</label>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-lg text-gray-700 mr-2">R$</span>
        <input
          type="number"
          value={creditValue}
          onChange={(e) => setCreditValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-lg"
          placeholder="105.000"
        />
        <FaPencilAlt size={20} className="ml-3 text-gray-500" />
      </div>
      <div className="flex justify-between text-lg text-gray-600 mb-2">
        <span>Mínimo R$ 10.000,00</span>
        <span>Máximo R$ 500.000,00</span>
      </div>
      <input
        type="range"
        min="10000"
        max="500000"
        step="1000"
        value={creditValue}
        onChange={(e) => setCreditValue(e.target.value)}
        className="w-full slider"
        style={{
          background: `linear-gradient(to right, #2F855A ${((creditValue - 10000) / 490000) * 100}%, #C6F6D5 ${((creditValue - 10000) / 490000) * 100}%)`
        }}
      />
      <div className="flex justify-between mt-6">
        <button onClick={handleBack} className="w-1/3 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 text-lg">
          Voltar
        </button>
        <button onClick={handleNext} className="w-1/3 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 text-lg">
          Ver opções
        </button>
      </div>
    </div>
  );
};

export default CreditValueStep;
