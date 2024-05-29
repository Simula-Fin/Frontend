import React from 'react';
import { FaHome, FaCar, FaMotorcycle } from 'react-icons/fa'; // Importando ícones

const SelectionStep = ({ selectedOption, setSelectedOption, handleNext }) => {
  const options = [
    { label: 'Imóveis', icon: <FaHome size={24} /> },
    { label: 'Carros', icon: <FaCar size={24} /> },
    { label: 'Motos', icon: <FaMotorcycle size={24} /> }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Simulador de Consórcio</h2>
      <p className="mb-4">Escolha uma das opções de consórcios que temos para você</p>
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="consortiumOption"
              value={option.label}
              checked={selectedOption === option.label}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mr-2"
            />
            <div className="flex items-center">
              {option.icon}
              <span className="ml-2">{option.label}</span>
            </div>
          </label>
        ))}
      </div>
      <button onClick={handleNext} className="mt-4 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
        Avançar
      </button>
    </div>
  );
};

export default SelectionStep;
