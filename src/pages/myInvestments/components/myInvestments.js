import React, { useState, useEffect, useCallback } from "react";
import { FaDownload } from "react-icons/fa";
import Graphics from "../../../pages/components/Graphics";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { p2pAxiosInstance } from "../../../utils/AxiosConfig";
import {
  createMockContract,
  generatePDF,
} from "../../../utils/generateContract";
import QRCode from "react-qr-code";
import Chat from "../../components/Chat";

Modal.setAppElement("#root");

const MyInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [selectedInvestmentInfo, setSelectedInvestmentInfo] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [investmentsAnalysis, setInvestmentsAnalysis] = useState([]);

  const [loans, setLoans] = useState([]);

  const handleQRCodeClick = async (loan_id) => {
    try {
      const response = await p2pAxiosInstance.put(`/loans/status/${loan_id}`, {
        status: "payed",
      });
      if (response.status === 200) {
        closePaymentModal();
        toast.success("Pagamento realizado com sucesso!");
        fetchInvestmentsAnalysis();
        fetchInvestments();
        fetchPayments();
        closePaymentModal();
      } else {
        closePaymentModal();
        toast.error("Erro ao realizar o pagamento. Tente novamente.");
      }
    } catch (error) {
      closePaymentModal();
      toast.error("Erro ao realizar o pagamento. Tente novamente.");
      console.log(error);
    }
  };

  const handleRowClickPayments = (payment) => {
    console.log(payment);
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPayment(null);
  };

  const fetchPayments = useCallback(async () => {
    try {
      const response = await p2pAxiosInstance.get("/payments/user/investor");
      const data = response.data;

      const groupedLoans = data.reduce((acc, loan) => {
        const { loan_id } = loan;
        if (!acc[loan_id]) {
          acc[loan_id] = [];
        }
        acc[loan_id].push(loan);
        return acc;
      }, {});

      setLoans(groupedLoans);
    } catch (error) {
      console.error("Erro ao buscar os pagamentos:", error);
      toast.error("Erro ao carregar pagamentos. Por favor, tente novamente.");
    }
  }, []);

  const [expandedLoan, setExpandedLoan] = useState(null);

  const toggleExpand = (loanId) => {
    setExpandedLoan(expandedLoan === loanId ? null : loanId);
  };

  const calculateLoanSummary = (loanInstallments) => {
    const totalAmount = loanInstallments.reduce(
      (acc, installment) => acc + installment.amount,
      0
    );
    const duration = loanInstallments[0]?.duration || 0;
    const interestRate = loanInstallments[0]?.interest_rate || 0;
    const numberOfInstallments = loanInstallments.length;
    return { totalAmount, duration, interestRate, numberOfInstallments };
  };

  const handleToggleDetails = (investment) => {
    if (
      selectedInvestmentInfo &&
      selectedInvestmentInfo.investment_id === investment.investment_id
    ) {
      setSelectedInvestmentInfo(null);
    } else {
      setSelectedInvestmentInfo(investment);
    }
  };
  const fetchInvestments = useCallback(async () => {
    try {
      const response = await p2pAxiosInstance.get("/contracts/user");
      const data = response.data.map((investment) => ({
        ...investment,
        investment_id: investment.contract_id,
        investor_id: investment.investor_id,
        borrower_name: investment.borrower_user.name,
        amount: investment.loan.amount,
        interest_rate: investment.loan.interest_rate,
        duration: investment.loan.duration,
        expected_profit: 100,
        status: investment.status,
      }));

      setInvestments(data);
    } catch (error) {
      console.error("Erro ao buscar os investimentos:", error);
      toast.error(
        "Erro ao carregar investimentos. Por favor, tente novamente."
      );
    }
  }, []);

  const fetchInvestmentsAnalysis = useCallback(async () => {
    try {
      const response = await p2pAxiosInstance.get("/investments/user");
      const data = response.data;
      setInvestmentsAnalysis(data);
    } catch (error) {
      console.error("Erro ao buscar os investimentos:", error);
      toast.error(
        "Erro ao carregar investimentos. Por favor, tente novamente."
      );
    }
  }, []);

  useEffect(() => {
    fetchInvestments();
    fetchInvestmentsAnalysis();
    fetchPayments();
    // stocks();
  }, [fetchInvestments, fetchInvestmentsAnalysis, fetchPayments]);

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
      <Graphics />
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            Informações Geral do meu investimento
          </h1>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nome do Devedor</th>
                <th className="py-3 px-6 text-left">Valor Emprestado</th>
                <th className="py-3 px-6 text-left">Taxa de Juros</th>
                <th className="py-3 px-6 text-left">Duração (Meses)</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {investmentsAnalysis.map((investment, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-100 cursor-pointer"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {investment.borrower_user.name}
                  </td>
                  <td className="py-3 px-6 text-left">{`R$ ${investment.amount}`}</td>
                  <td className="py-3 px-6 text-left">{`${investment.loan.interest_rate}%`}</td>
                  <td className="py-3 px-6 text-left">
                    {investment.loan.duration}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full">
                      {investment.loan.status === "approved"
                        ? "Faça o pagamento"
                        : investment.loan.status === "done"
                        ? "Finalizado"
                        : investment.loan.status === "payed"
                        ? "Em andamento"
                        : investment.loan.status === "pending"
                        ? "Em análise"
                        : investment.loan.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => handleToggleDetails(investment)}
                    >
                      {selectedInvestmentInfo &&
                      selectedInvestmentInfo.investment_id ===
                        investment.investment_id
                        ? "Fechar"
                        : "Ver mais"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedInvestmentInfo && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">
              Detalhes do Investimento
            </h2>
            <div className="mb-4">
              <h3 className="text-md font-medium">Informações do Empréstimo</h3>
              <p>
                <strong>Nome do Devedor:</strong>{" "}
                {selectedInvestmentInfo.borrower_user.name}
              </p>
              <p>
                <strong>Email do Devedor:</strong>{" "}
                {selectedInvestmentInfo.borrower_user.email}
              </p>
              <p>
                <strong>Valor Emprestado:</strong> R${" "}
                {selectedInvestmentInfo.loan.amount}
              </p>
              <p>
                <strong>Taxa de Juros:</strong>{" "}
                {selectedInvestmentInfo.loan.interest_rate}%
              </p>
              <p>
                <strong>Duração:</strong> {selectedInvestmentInfo.loan.duration}{" "}
                meses
              </p>
              <p>
                <strong>Status do Empréstimo:</strong>{" "}
                {selectedInvestmentInfo.loan.status === "approved"
                  ? "Aguardando pagamento"
                  : selectedInvestmentInfo.loan.status === "done"
                  ? "Finalizado"
                  : selectedInvestmentInfo.loan.status === "pending"
                  ? "Em análise"
                  : selectedInvestmentInfo.loan.status}
              </p>
              {selectedInvestmentInfo.loan.status === "approved" && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4">
                  <p>Realize o pagamento do empréstimo!</p>
                  <button
                    onClick={() =>
                      handleRowClickPayments(selectedInvestmentInfo)
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Relizar Pagamento
                  </button>
                </div>
              )}
              {isPaymentModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">
                      Pagamento Pendentes
                    </h2>
                    {selectedPayment && (
                      <>
                        <div
                          className="flex justify-center mb-4"
                          onClick={() =>
                            handleQRCodeClick(selectedPayment.loan_id)
                          }
                        >
                          <QRCode
                            value={`https://example.com/investments/user/${selectedPayment.loan_id}`}
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
            </div>
            <div className="mb-4">
              <h3 className="text-md font-medium">Informações do Investidor</h3>
              <p>
                <strong>Nome do Investidor:</strong>{" "}
                {selectedInvestmentInfo.investor_user.name}
              </p>
              <p>
                <strong>Email do Investidor:</strong>{" "}
                {selectedInvestmentInfo.investor_user.email}
              </p>
            </div>
            <div>
              <h3 className="text-md font-medium">
                Informações Gerais do Contrato
              </h3>
              <p>
                <strong>Data de Assinatura:</strong>{" "}
                {selectedInvestmentInfo.date_signed &&
                  new Date(
                    selectedInvestmentInfo.date_signed
                  ).toLocaleDateString()}
              </p>
              <p>
                <strong>Status do Contrato:</strong>{" "}
                {selectedInvestmentInfo.status}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Meus Pagamentos</h1>
      </div>
      <div className="overflow-hidden rounded-lg shadow-lg mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Valor Total</th>
              <th className="py-2 px-4 border-b text-center">
                Número de Parcelas
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(loans).map((loanId) => {
              const loanInstallments = loans[loanId];
              const { totalAmount, numberOfInstallments } =
                calculateLoanSummary(loanInstallments);
              return (
                <React.Fragment key={loanId}>
                  <tr
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300"
                    onClick={() => toggleExpand(loanId)}
                  >
                    <td className="py-2 px-4 border-b text-center">
                      R${totalAmount}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {numberOfInstallments}
                    </td>
                  </tr>
                  {expandedLoan === loanId && (
                    <React.Fragment>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-center">
                          Número da Parcela
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Valor da Parcela
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Status
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Data de Vencimento
                        </th>
                      </tr>
                      {loanInstallments.map((installment) => (
                        <tr
                          key={installment.payment_id}
                          className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                        >
                          <td className="py-2 px-4 border-b text-center">
                            {installment.installment_number}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            R${installment.investor_profit}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <span
                              className={`py-1 px-3 rounded-full ${
                                installment.status_payment_investor ===
                                "pending"
                                  ? "bg-red-100 text-red-600"
                                  : installment.status_payment_investor ===
                                    "payed"
                                  ? "bg-green-100 text-green-600"
                                  : ""
                              }`}
                            >
                              {installment.status_payment_investor === "pending"
                                ? "Pendente"
                                : installment.status_payment_investor ===
                                  "payed"
                                ? "Pago"
                                : installment.status_payment_investor}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {new Date(
                              installment.due_date
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-xl font-bold">Meus Contratos</h1>
      </div>
      <div className="overflow-hidden rounded-lg shadow-lg mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
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
                <td className="py-2 px-4 border-b text-center">
                  <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full">
                    {investment.status === "active"
                      ? "Ativo"
                      : investment.status === "done"
                      ? "Finalizado"
                      : investment.status === "pending"
                      ? "Em análise"
                      : investment.status}
                  </span>
                </td>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmar Download"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      <Chat />
    </div>
  );
};

export default MyInvestments;
