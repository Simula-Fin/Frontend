import React, { useState, useEffect } from "react";
import perfil2 from "../../../assets/img2.png";
import perfil3 from "../../../assets/senhora.png";
import perfil4 from "../../../assets/mulher3.png";
import perfil5 from "../../../assets/images4.png";
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import Chart from "../../../pages/components/Chart";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { p2pAxiosInstance } from "../../../utils/AxiosConfig";
import { createMockContract, generatePDF } from "../../../utils/generateContract";

Modal.setAppElement('#root');

const MyInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  useEffect(() => {
    const pictures = [perfil2, perfil3, perfil4, perfil5];

    // Dados mockados
    const mockData = [
      { investment_id: 1, investor_id: 1, borrower_name: "Alex", amount: 1000, interest_rate: 5, duration: 12, expected_profit: 50, status: "ativo" },
      { investment_id: 2, investor_id: 1, borrower_name: "Jorge", amount: 2000, interest_rate: 10, duration: 24, expected_profit: 200, status: "concluído" },
      { investment_id: 3, investor_id: 1, borrower_name: "Rebeca", amount: 3000, interest_rate: 15, duration: 36, expected_profit: 450, status: "ativo" },
    ];

    setInvestments(mockData);

    // Código comentado que será mantido
    // const fetchInvestments = async () => {
    //   try {
    //     const response = await p2pAxiosInstance.get("/investments");
    //     const data = response.data.map((investment, index) => ({
    //       ...investment,
    //       picture: pictures[index % pictures.length],
    //     }));
    //     setInvestments(data);
    //   } catch (error) {
    //     console.error("Erro ao buscar investimentos:", error);
    //     toast.error(
    //       "Erro ao carregar investimentos. Por favor, tente novamente."
    //     );
    //   }
    // };

    // fetchInvestments();
  }, []);

  const handleDownloadContract = (investment) => {
    setSelectedInvestment(investment);
    setIsModalOpen(true);
  };

  const confirmDownload = () => {
    const contract = createMockContract(selectedInvestment);
    generatePDF(contract);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Meus Investimentos</h1>
      </div>
      <>
        <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">INVESTIMENTOS REALIZADOS</h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">{investments.length}</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} color="" />
          </div>
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">RENDA EMPREGADA</h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">R$1750.00</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} />
          </div>
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">LUCRO ESTIMADO (MÊS)</h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">R$175.00</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} />
          </div>
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">INVESTIMENTOS EM ANÁLISE</h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">0</h1>
            </div>
            <FaRegCalendarMinus fontSize={28} />
          </div>
        </div>
      </>
      <div className="overflow-hidden rounded-lg shadow-lg mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Nome do Devedor</th>
              <th className="py-2 px-4 border-b text-center">Valor Emprestado</th>
              <th className="py-2 px-4 border-b text-center">Taxa de Juros</th>
              <th className="py-2 px-4 border-b text-center">Duração (Meses)</th>
              <th className="py-2 px-4 border-b text-center">Lucro Esperado</th>
              <th className="py-2 px-4 border-b text-center">Status</th>
              <th className="py-2 px-4 border-b text-center">Contrato</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                <td className="py-2 px-4 border-b text-center">{investment.borrower_name}</td>
                <td className="py-2 px-4 border-b text-center">R${investment.amount}</td>
                <td className="py-2 px-4 border-b text-center">{investment.interest_rate}%</td>
                <td className="py-2 px-4 border-b text-center">{investment.duration}</td>
                <td className="py-2 px-4 border-b text-center">R${investment.expected_profit}</td>
                <td className="py-2 px-4 border-b text-center">{investment.status}</td>
                <td className="py-2 px-4 border-b text-center">
                  <FaDownload
                    className="text-green-500 cursor-pointer mx-auto"
                    onClick={() => handleDownloadContract(investment)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Chart />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmar Download"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Confirmar Download</h2>
        <p>Deseja baixar o contrato de {selectedInvestment?.borrower_name}?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={confirmDownload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyInvestments;
