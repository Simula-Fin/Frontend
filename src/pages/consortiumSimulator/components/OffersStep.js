import React from 'react';

const OffersStep = ({ offers, handleNewSimulation }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Simulador de Consórcio</h2>
      <h3 className="text-xl font-bold mb-4">Principais Ofertas</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {offers.map((offer, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm">
            <h4 className="font-bold mb-2">{offer.title}</h4>
            <p>R${Number(offer.value).toFixed(2)}</p>
            <p>Parcela: R${Number(offer.installment).toFixed(2)}</p>
            <p>Prazo: {offer.duration} meses</p>
            <button className="mt-2 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Solicitar Contato</button>
          </div>
        ))}
      </div>
      <button onClick={handleNewSimulation} className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
        Fazer Nova Simulação
      </button>
    </div>
  );
};

export default OffersStep;
