import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-md flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">Conquiste os seus sonhos</h1>
      <p className="text-xl mb-6 text-center">Dê um salto em busca de novas aventuras. Obtenha já uma análise de crédito e venha realizar seus sonhos!</p>
      <button className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600">Saiba mais</button>
    </div>
  );
};

export default HomePage;
