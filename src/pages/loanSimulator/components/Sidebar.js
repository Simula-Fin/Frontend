import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import simulaFinLogo from '../../../assets/logoBank.jpg';


const Sidebar = () => {
    const [configOpen, setConfigOpen] = useState(false);
    const [simulationOpen, setSimulationOpen] = useState(false);
  
    return (
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="px-4 py-6 text-lg font-bold flex items-center">
          <img src={simulaFinLogo} alt="Simula-Fin Logo" className="h-8 mr-2" />
          Simula-Fin
        </div>
        <div className="flex-1">
          <nav>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Boas vindas</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Financiamentos</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Empréstimos</a>
            <div>
              <button onClick={() => setSimulationOpen(!simulationOpen)} className="block px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center justify-between">
                <span>Simulações</span>
                {simulationOpen ? <FaChevronDown /> : <FaChevronRight />}
              </button>
              {simulationOpen && (
                <div className="pl-4">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Consórcio</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Empréstimo</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Financiamento</a>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => setConfigOpen(!configOpen)} className="block px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center justify-between">
                <span>Configurações</span>
                {configOpen ? <FaChevronDown /> : <FaChevronRight />}
              </button>
              {configOpen && (
                <div className="pl-4">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700">Perfil</a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  };
  
  export default Sidebar;