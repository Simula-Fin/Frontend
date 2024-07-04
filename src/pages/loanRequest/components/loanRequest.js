import React, { useState } from "react";
import Graphics from "../../../pages/components/Graphics";
import { p2pAxiosInstance } from '../../../utils/AxiosConfig';
import { toast } from 'react-toastify';
import Chat from "../../components/Chat";

const LoanRequest = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [accumulatedAssets, setAccumulatedAssets] = useState("");
  const [desiredInterestRate, setDesiredInterestRate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTermsAccepted) {
      let normalizedLoanPurpose = loanPurpose.toLocaleLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '');
  
      if (normalizedLoanPurpose === "outros") {
        normalizedLoanPurpose = "compras";
      }
  
      const loanRequest = {
        amount: parseFloat(loanAmount.replace(".", "").replace(",", ".")),
        interest_rate: desiredInterestRate
          ? parseFloat(desiredInterestRate)
          : null,
        duration: parseInt(loanDuration, 10),
        goals: normalizedLoanPurpose,
      };

      p2pAxiosInstance.post("/loans", loanRequest)
        .then((response) => {
          toast.success("Seu empréstimo foi encaminhado à nossa equipe para análise. Em breve entraremos em contato com você.");
          console.log(response);
          handleCancel();
        })
        .catch((error) => {
          toast.error("Erro ao enviar a solicitação. Por favor, tente novamente.");
          console.log(error);
          handleCancel();
        });
  
      // Fechar o modal após a submissão
      setIsModalOpen(false);
      setIsTermsAccepted(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setLoanAmount("");
    setLoanDuration("");
    setLoanPurpose("");
    setAccumulatedAssets("");
    setDesiredInterestRate("");
  };

  const formatCurrency = (value) => {
    value = value.replace(/[^\d,.]|\.(?=.*[,.])/g, "");
    value = value.replace(/\.(?![\d]{2})/g, "");
    value = value.replace(",", ".");
    value = parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  
    return value;
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(formatCurrency(e.target.value));
  };

  const handleAccumulatedAssetsChange = (e) => {
    setAccumulatedAssets(formatCurrency(e.target.value));
  };

  const handleNumberChange = (setState) => (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setState(value);
  };

  const loanPurposes = [
    "Viagem",
    "Negócios",
    "Compras",
    "Outros",
  ];

  return (
    <>
      <Graphics />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Solicitar Empréstimo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Valor do Empréstimo:
            </label>
            <input
              type="text"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="0,00"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Duração do Empréstimo (em meses):
            </label>
            <input
              type="text"
              value={loanDuration}
              onChange={handleNumberChange(setLoanDuration)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Finalidade do Empréstimo:
            </label>
            <select
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecione</option>
              {loanPurposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Patrimônio Acumulado:
            </label>
            <input
              type="text"
              value={accumulatedAssets}
              onChange={handleAccumulatedAssetsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="0,00"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Taxa de Juros Desejada (Opcional):
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={desiredInterestRate}
                onChange={handleNumberChange(setDesiredInterestRate)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="0"
              />
              <span className="ml-2">%</span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white p-2 rounded-md mr-2 hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Solicitar
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Termos e Condições</h2>
            <p className="mb-4">
              Antes de enviar sua solicitação de empréstimo, você deve concordar
              com os nossos 
              <a href="/termos" className="ml-1 text-blue-500 underline">
                 termos e condições
              </a>
              .
            </p>
            <div className="mb-4">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={() => setIsTermsAccepted(!isTermsAccepted)}
              />
              <label htmlFor="terms" className="ml-2">
                Eu concordo com os termos e condições
              </label>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded-md mr-2 hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                disabled={!isTermsAccepted}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <Chat />
    </>
  );
};

export default LoanRequest;
