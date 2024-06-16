import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight, FaHome, FaMoneyCheckAlt, FaHandHoldingUsd, FaCogs, FaUser, FaListUl, FaDollarSign, FaSignOutAlt, FaChartLine, FaUserShield } from 'react-icons/fa';
import simulaFinLogo from '../../assets/logoBank.jpg';
import { useAuth } from '../../utils/AuthContext'

const Sidebar = () => {
    const [configOpen, setConfigOpen] = useState(false);
    const [simulationOpen, setSimulationOpen] = useState(false);
    const [loanOpen, setLoanOpen] = useState(false); // Novo estado para a seção de Empréstimos
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const { authLogout } = useAuth();

    const handleLogout = () => {
        authLogout();

        setLogoutModalOpen(false);
    };

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <Link to="/" className="px-4 py-4 text-lg font-bold flex items-center">
                <img src={simulaFinLogo} alt="Simula-Fin Logo" className="h-8 mr-2" />
                Simula-Fin
            </Link>
            <div className="flex-1">
                <nav>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                        <FaHome className="mr-2" /> Boas vindas
                    </Link>
                    <div>
                        <button onClick={() => setLoanOpen(!loanOpen)} className="block px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center justify-between">
                            <span className="flex items-center"><FaDollarSign className="mr-2" />Rede de Empréstimos</span>
                            {loanOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </button>
                        {loanOpen && (
                            <div className="pl-4">
                                <Link to="/loan-request" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                                    <FaHandHoldingUsd className="mr-2" /> Solicitação de Empréstimo
                                </Link>
                                <Link to="/loan-opportunities" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                                    <FaChartLine className="mr-2" /> Oportunidades de Investimentos
                                </Link>
                            </div>
                        )}
                    </div>
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
                    <button onClick={() => setLogoutModalOpen(true)} className="block w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center">
                        <FaSignOutAlt className="mr-2" /> Sair
                    </button>
                </nav>
            </div>
            <div className="mt-4">
                <Link to="/admin" className="block px-4 py-2 hover:bg-gray-700 flex items-center">
                    <FaUserShield className="mr-2" /> Administrador
                </Link>
            </div>

            {logoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4 text-black">Confirmar Logout</h2>
                        <p className="mb-4 text-black">Deseja mesmo sair?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setLogoutModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;