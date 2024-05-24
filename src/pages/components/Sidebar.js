import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaHome, FaMoneyCheckAlt, FaHandHoldingUsd, FaCogs, FaUser, FaListUl, FaDollarSign } from 'react-icons/fa';
import simulaFinLogo from '../../assets/logoBank.jpg';

const Sidebar = () => {
    const [configOpen, setConfigOpen] = useState(false);
    const [simulationOpen, setSimulationOpen] = useState(false);

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="px-4 py-4 text-lg font-bold flex items-center">
                <img src={simulaFinLogo} alt="Simula-Fin Logo" className="h-8 mr-2" />
                Simula-Fin
            </div>
            <div className="flex-1">
                <nav>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                        <FaHome className="mr-2" /> Boas vindas
                    </Link>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                        <FaDollarSign className="mr-2" /> Solicitação de Empréstimo
                    </Link>
                    <div>
                        <button onClick={() => setSimulationOpen(!simulationOpen)} className="block px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center justify-between">
                            <span className="flex items-center"><FaListUl className="mr-2" /> Simulações</span>
                            {simulationOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </button>
                        {simulationOpen && (
                            <div className="pl-4">
                                <Link to="/consortium" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                                    <FaMoneyCheckAlt className="mr-2" /> Consórcio
                                </Link>
                                <Link to="/loan-simulator" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                                    <FaHandHoldingUsd className="mr-2" /> Empréstimo
                                </Link>
                                <Link to="/financing" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                                    <FaMoneyCheckAlt className="mr-2" /> Financiamento
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={() => setConfigOpen(!configOpen)} className="block px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center justify-between">
                            <span className="flex items-center"><FaCogs className="mr-2" /> Configurações</span>
                            {configOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </button>
                        {configOpen && (
                            <div className="pl-4">
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                                    <FaUser className="mr-2" /> Perfil
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
