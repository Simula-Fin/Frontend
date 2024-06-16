import React from "react";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

import { toast } from 'react-toastify';
import Graphics from "../../pages/components/Graphics";

import perfil2 from '../../assets/img2.png'; 
import perfil3 from '../../assets/senhora.png';
import perfil4 from '../../assets/mulher3.png';
import perfil5 from '../../assets/images4.png'; 

const AdminPage = () => {

    const opportunities = [
        { name: 'Alex', duration: 20, amount: 'R$5000', interestRate: '12%', risk: 'baixo', picture: perfil5, loan_id: 1, borrower_id: 1 },
        { name: 'Jorge', duration: 30, amount: 'R$2000', interestRate: '14%', risk: 'alto', picture: perfil2, loan_id: 2, borrower_id: 2 },
        { name: 'Rebeca', duration: 40, amount: 'R$9000', interestRate: '22%', risk: 'baixo', picture: perfil3, loan_id: 3, borrower_id: 3 },
        { name: 'Cassiana', duration: 50, amount: 'R$7000', interestRate: '72%', risk: 'médio', picture: perfil4, loan_id: 4, borrower_id: 4 },
        { name: 'Eduardo', duration: 60, amount: 'R$2000', interestRate: '47%', risk: 'baixo', picture: perfil5, loan_id: 5, borrower_id: 5 },
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

    const confirmInvestmentToast = () => {
        toast.success('Seu investimento passará por análise. Observe o andamento na tela de "meus investimentos".');
        closeModal();
    };

    const handleRowClick = (opportunity) => {
        setSelectedOpportunity(opportunity);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOpportunity(null);
    };

    

  return (
    <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
          Administrador Peer to Peer
        </h1>

        <button className="bg-[#2E59D9] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]">
          Gerar Relatório
        </button>
      </div>
        <Graphics />
      <div className="flex mt-[22px] w-full gap-[30px]">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
              Investimentos aguardando aprovação
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>

          <div className="w-full">
          <div className="overflow-hidden rounded-lg shadow-lg mt-4">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Nome</                            th>
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
                                onClick={confirmInvestmentToast}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
          </div>
        </div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
              Pagamentos Pendentes!
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="pl-[35px]">{}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
