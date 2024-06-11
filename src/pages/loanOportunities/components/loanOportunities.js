import React from 'react';
import { Link } from 'react-router-dom';
import logoBank from '../../../assets/logoBank.jpg'; // Importe a imagem com o caminho correto

const LoanOpportunities = () => {
    const opportunities = [
        { name: 'Alex', duration: 20, amount: '$5000', interestRate: '12%', risk: 'baixo' },
        { name: 'Ereena', duration: 30, amount: '$2000', interestRate: '14%', risk: 'alto' },
        { name: 'John', duration: 40, amount: '$9000', interestRate: '22%', risk: 'baixo' },
        { name: 'Matrix', duration: 50, amount: '$7000', interestRate: '72%', risk: 'médio' },
        { name: 'Virat', duration: 60, amount: '$2000', interestRate: '47%', risk: 'baixo' },
    ];

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
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nome</th>
                        <th className="py-2 px-4 border-b">Duração (Meses)</th>
                        <th className="py-2 px-4 border-b">Valor</th>
                        <th className="py-2 px-4 border-b">Taxa de Juros</th>
                        <th className="py-2 px-4 border-b">Risco</th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map((opportunity, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b flex items-center">
                                <img src={logoBank} alt={opportunity.name} className="h-10 w-10 mr-2 rounded-full" />
                                {opportunity.name}
                            </td>
                            <td className="py-2 px-4 border-b">{opportunity.duration}</td>
                            <td className="py-2 px-4 border-b">{opportunity.amount}</td>
                            <td className="py-2 px-4 border-b">{opportunity.interestRate}</td>
                            <td className={`py-2 px-4 border-b ${getRiskColor(opportunity.risk)}`}>
                                {opportunity.risk.charAt(0).toUpperCase() + opportunity.risk.slice(1)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanOpportunities;
