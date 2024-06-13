import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import perfil2 from '../../../assets/img2.png'; 
import perfil3 from '../../../assets/senhora.png';
import perfil4 from '../../../assets/mulher3.png';
import perfil5 from '../../../assets/images4.png'; 

const LoanOpportunities = () => {
    const opportunities = [
        { name: 'Alex', duration: 20, amount: 'R$5000', interestRate: '12%', risk: 'baixo', picture: perfil5 },
        { name: 'Jorge', duration: 30, amount: 'R$2000', interestRate: '14%', risk: 'alto', picture: perfil2 },
        { name: 'Rebeca', duration: 40, amount: 'R$9000', interestRate: '22%', risk: 'baixo', picture: perfil3 },
        { name: 'Cassiana', duration: 50, amount: 'R$7000', interestRate: '72%', risk: 'médio', picture: perfil4 },
        { name: 'Eduardo', duration: 60, amount: 'R$2000', interestRate: '47%', risk: 'baixo', picture: perfil5 },
    ];

    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'baixo':
                return 'text-green-500';
            case 'médio':
                return 'text-yellow-500';
            case 'alto':
                return 'text-red-500';
            default:
                return '';
        }
    };

    const handleRowClick = (opportunity) => {
        setSelectedOpportunity(opportunity);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOpportunity(null);
    };

    const confirmInvestment = () => {
        // Add your investment confirmation logic here
        alert(`Investment confirmed for ${selectedOpportunity.name}`);
        closeModal();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Oportunidades de Investimentos</h1>
                <Link to="/loan-request">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Solicitar empréstimo
                    </button>
                </Link>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Nome</th>
                            <th className="py-2 px-4 border-b text-center">Duração (Meses)</th>
                            <th className="py-2 px-4 border-b text-center">Valor</th>
                            <th className="py-2 px-4 border-b text-center">Taxa de Juros</th>
                            <th className="py-2 px-4 border-b text-center">Risco</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opportunities.map((opportunity, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(opportunity)}
                                className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                            >
                                <td className="py-2 px-4 border-b flex items-center">
                                    <img src={opportunity.picture} alt={opportunity.name} className="h-10 w-10 mr-2 rounded-full" />
                                    {opportunity.name}
                                </td>
                                <td className="py-2 px-4 border-b text-center">{opportunity.duration}</td>
                                <td className="py-2 px-4 border-b text-center">{opportunity.amount}</td>
                                <td className="py-2 px-4 border-b text-center">{opportunity.interestRate}</td>
                                <td className={`py-2 px-4 border-b text-center ${getRiskColor(opportunity.risk)}`}>
                                    {opportunity.risk.charAt(0).toUpperCase() + opportunity.risk.slice(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmação de Investimento</h2>
                        <p>Tem certeza que deseja investir em {selectedOpportunity.name}? Um contrato será gerado com mais informações.</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmInvestment}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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

export default LoanOpportunities;
