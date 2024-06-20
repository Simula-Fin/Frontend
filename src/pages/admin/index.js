import React, { useEffect } from "react";
import { useState } from "react";
import { FaEllipsisV, FaCheck, FaTimes } from "react-icons/fa";
import { p2pAxiosInstance } from "../../utils/AxiosConfig";
import { toast } from "react-toastify";
import Graphics from "../../pages/components/Graphics";
import QRCode from "react-qr-code";

import perfil2 from "../../assets/img2.png";
import perfil3 from "../../assets/senhora.png";
import perfil4 from "../../assets/mulher3.png";
import perfil5 from "../../assets/images4.png";

const AdminPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [investPaymentsPending, setInvestPaymentsPending] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [pendingPayments, setPendingPayments] = useState([
    {
      photo: perfil2,
      name: "Investidor 1",
      status: "approved",
    },
    {
      photo: perfil3,
      name: "Investidor 2",
      status: "approved",
    },
    {
      photo: perfil4,
      name: "Investidor 3",
      status: "approved",
    },
  ]);

  useEffect(() => {
    const pictures = [perfil2, perfil3, perfil4, perfil5];
    const fetchOpportunities = async () => {
      try {
        const response = await p2pAxiosInstance.get("/investments");
        const data = response.data.map((opportunity, index) => ({
          ...opportunity,
          risk: getRiskLevel(opportunity.loan.risk_score),
          picture: pictures[index % pictures.length],
        }));
        setOpportunities(data);
      } catch (error) {
        console.error("Erro ao buscar oportunidades de empréstimo:", error);
        toast.error(
          "Erro ao carregar oportunidades de empréstimo. Por favor, tente novamente."
        );
      }
    };

    const fetchInvestPaymentsPending = async () => {
      try {
        const response = await p2pAxiosInstance.get(
          "/payments/pending-payments"
        );
        const data = response.data.map((payment, index) => ({
          ...payment,
          picture: pictures[index % pictures.length],
        }));
        setInvestPaymentsPending(data);
      } catch (error) {
        console.error("Erro ao buscar investimentos pendentes:", error);
        toast.error(
          "Erro ao carregar investimentos pendentes. Por favor, tente novamente."
        );
      }
    };

    fetchOpportunities();
    fetchInvestPaymentsPending();
  }, []);

  const handleApprove = async (opportunity) => {
    // await p2pAxiosInstance.post(`/loans/status/${opportunity.investment_id}`, {
    //   status: "approved",
    // });
    toast.success("Investimento aprovado com sucesso!");
  };

  const handleReject = (opportunity) => {
    console.log("Rejeitando investimento", opportunity);
    toast.error("Investimento recusado!");
  };

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRiskLevel = (riskScore) => {
    if (riskScore < 30) return "baixo";
    if (riskScore >= 30 && riskScore <= 60) return "médio";
    return "alto";
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "baixo":
        return "text-green-500";
      case "médio":
        return "text-yellow-500";
      case "alto":
        return "text-red-500";
      default:
        return "";
    }
  };

  const handleRowClickPayments = (payment) => {
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPayment(null);
  };

  const handleRowClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOpportunity(null);
  };

  const handleQRCodeClick = async (payment_id) => {
    try {
      const response = await p2pAxiosInstance.patch(
        `/payments/investor/${payment_id}`,
        {
          status: "payed",
        }
      );
      if (response.status === 200) {
        toast.success("Pagamento realizado com sucesso!");
      } else {
        toast.error("Erro ao realizar o pagamento. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao realizar o pagamento. Tente novamente.");
    }
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
              Investidores aguardando pagamento!
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="w-full">
            <div className="overflow-hidden rounded-lg shadow-lg mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">
                      Email do Investidor
                    </th>
                    <th className="py-2 px-4 border-b text-center">
                      Status do Pagamento
                    </th>
                    <th className="py-2 px-4 border-b text-center">Valor</th>
                    <th className="py-2 px-4 border-b text-center">
                      Número da Parcela
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {investPaymentsPending.map((payment, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClickPayments(payment)}
                      className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-100 cursor-pointer"
                    >
                      <td className="py-2 px-4 border-b flex items-center">
                        <img
                          src={payment.picture}
                          alt={payment.loan.user.name}
                          className="h-10 w-10 mr-2 rounded-full"
                        />
                        {payment.loan.user.email}
                      </td>
                      <td
                        className={`py-2 px-4 text-center ${
                          payment.status_payment_investor === "pending"
                            ? "text-red-600 py-1 px-3"
                            : ""
                        }`}
                      >
                        {payment.status_payment_investor === "pending"
                          ? "Pendente"
                          : payment.status_payment_investor}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        R${payment.amount}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {payment.installment_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
              Pagamentos Pendentes de Investidores!
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg mt-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Foto</th>
                  <th className="py-2 px-4 border-b text-left">Nome</th>
                  <th className="py-2 px-4 border-b text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingPayments.map((payment, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                  >
                    <td className="py-2 px-4 border-b flex items-center">
                      <img
                        src={payment.photo}
                        alt={payment.name}
                        className="h-10 w-10 mr-2 rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{payment.name}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full">
                        Pagamento em aberto
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isPaymentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Pagamento Pendentes</h2>
            {selectedPayment && (
              <>
                <div
                  className="flex justify-center mb-4"
                  onClick={() => handleQRCodeClick(selectedPayment.payment_id)}
                >
                  <QRCode
                    value={`https://example.com/investments/user/${selectedPayment.payment_id}`}
                  />
                </div>
                <p className="text-center">
                  Escaneie o QR code para realizar o pagamento.
                </p>
              </>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closePaymentModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex mt-[22px] w-full gap-[30px]">
        <div className="basis-[100%] border bg-white shadow-md cursor-pointer rounded-[4px]">
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
                    <th className="py-2 px-4 border-b text-left">
                      Nome Investidor
                    </th>
                    <th className="py-2 px-4 border-b text-left">
                      Tomador Empréstimo
                    </th>
                    <th className="py-2 px-4 border-b text-center">
                      Duração (Meses)
                    </th>
                    <th className="py-2 px-4 border-b text-center">Valor</th>
                    <th className="py-2 px-4 border-b text-center">
                      Taxa de Juros
                    </th>
                    <th className="py-2 px-4 border-b text-center">Risco</th>
                    <th className="py-2 px-4 border-b text-center">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opportunity, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(opportunity)}
                      className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-100 cursor-pointer"
                    >
                      <td className="py-2 px-4 border-b text-left">
                        {opportunity.investor.email}
                      </td>
                      <td className="py-2 px-4 border-b text-left">
                        {opportunity.loan.user.email}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {opportunity.loan.duration}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        R${opportunity.loan.amount}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {opportunity.loan.interest_rate}%
                      </td>
                      <td
                        className={`py-2 px-4 border-b text-center ${getRiskColor(
                          opportunity.loan.risk_score
                        )}`}
                      >
                        {opportunity.risk.charAt(0).toUpperCase() +
                          opportunity.risk.slice(1)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(opportunity);
                          }}
                        >
                          <FaCheck className="inline-block" /> Aprovar
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(opportunity);
                          }}
                        >
                          <FaTimes className="inline-block" /> Recusar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                  {" "}
                  <h2 className="text-xl font-bold mb-4">
                    Informações do Investimento
                  </h2>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {" "}
                    <dt className="text-gray-700 font-medium">
                      ID do Investimento
                    </dt>
                    <dd className="text-gray-900">
                      {selectedOpportunity.investment_id}
                    </dd>
                    <dt className="text-gray-700 font-medium">
                      Valor Investido
                    </dt>
                    <dd className="text-gray-900">
                      {selectedOpportunity.amount}
                    </dd>
                    <dt className="text-gray-700 font-medium">Empréstimo</dt>
                    <dd className="grid grid-cols-1 gap-2">
                      {" "}
                      <dd className="text-gray-900">
                        ID: {selectedOpportunity.loan.loan_id}
                      </dd>
                      <dd className="text-gray-900">
                        Valor: {selectedOpportunity.loan.amount}
                      </dd>
                      <dd className="text-gray-900">
                        Taxa de Juros: {selectedOpportunity.loan.interest_rate}%
                      </dd>
                      <dd className="text-gray-900">
                        Prazo: {selectedOpportunity.loan.duration} meses
                      </dd>
                      <dd className="text-gray-900">
                        Situação: {selectedOpportunity.loan.status}
                      </dd>
                      <dd className="text-gray-900">
                        Objetivo: {selectedOpportunity.loan.goals}
                      </dd>
                      <dt className="text-gray-700 font-medium pl-4">
                        Tomador do Empréstimo
                      </dt>
                      <dd className="text-gray-900 pl-4">
                        {selectedOpportunity.loan.user.name}
                      </dd>
                      <dd className="text-gray-900 pl-4">
                        CPF: {selectedOpportunity.loan.user.cpf}
                      </dd>
                      <dd className="text-gray-900 pl-4">
                        Score de Risco: {selectedOpportunity.loan.risk_score}
                      </dd>
                    </dd>
                    <dt className="text-gray-700 font-medium">Investidor</dt>
                    <dd className="text-gray-900">
                      {selectedOpportunity.investor.name} (
                      {selectedOpportunity.investor.email})
                    </dd>
                  </dl>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
