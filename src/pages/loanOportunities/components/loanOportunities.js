import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import perfil2 from "../../../assets/img2.png";
import perfil3 from "../../../assets/senhora.png";
import perfil4 from "../../../assets/mulher3.png";
import perfil5 from "../../../assets/images4.png";
import Graphics from "../../../pages/components/Graphics";
import Chart from "../../../pages/components/Chart";
import { toast } from "react-toastify";
import { StockSummaryAccordion } from "../../components/StockAccordion";
import { p2pAxiosInstance } from "../../../utils/AxiosConfig";
import ReactLoading from "react-loading";
import Chat from "../../components/Chat";

const LoanOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [stockSummaries, setStockSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tickers = ["BBAS3", "PETR4", "VALE3", "ITUB4", "ABEV3"];

  const fetchMultipleStockSummaries = async (tickers) => {
    const summaries = [];

    for (const ticker of tickers) {
      try {

        const response = await p2pAxiosInstance.get(`/stocks/stock-summary/${ticker}`);

        summaries.push(response.data.response);

      } catch (error) {
        console.error(`Erro ao buscar os dados da ação ${ticker}:`, error);
      }
    }

    return summaries;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMultipleStockSummaries(tickers);
        setStockSummaries(data);
      } catch (error) {
        console.error("Erro ao buscar os dados das ações:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchOpportunities = useCallback(async () => {
    const pictures = [perfil2, perfil3, perfil4, perfil5];
    try {
      const response = await p2pAxiosInstance.get("/loans");
      const data = response.data.map((opportunity, index) => ({
        ...opportunity,
        risk: getRiskLevel(opportunity.risk_score),
        picture: pictures[index % pictures.length],
      }));
      setOpportunities(data);
    } catch (error) {
      console.error("Erro ao buscar oportunidades de empréstimo:", error);
      toast.error(
        "Erro ao carregar oportunidades de empréstimo. Por favor, tente novamente."
      );
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

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

  const handleRowClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOpportunity(null);
  };

  const confirmInvestment = async () => {
    try {
      const { loan_id, amount } = selectedOpportunity;
      const response = await p2pAxiosInstance.post("/investments", {
        loan_id,
        amount,
      });
      console.log("Investimento confirmado:", response.data);
      toast.success(
        "Seu investimento foi encaminhado para análise. Você pode verificar o andamento na página de Meus Investimentos."
      );
      closeModal();
      fetchOpportunities();
    } catch (error) {
      console.error("Erro ao confirmar o investimento:", error);
      toast.error(
        "Erro ao confirmar o investimento. Por favor, tente novamente."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <ReactLoading type="spin" color="#2F855A" height={50} width={50} />
      </div>
    );
  }

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
      <Graphics />
      <div className="overflow-hidden rounded-lg shadow-lg mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Nome</th>
              <th className="py-2 px-4 border-b text-center">
                Duração (Meses)
              </th>
              <th className="py-2 px-4 border-b text-center">Valor</th>
              <th className="py-2 px-4 border-b text-center">Taxa de Juros</th>
              <th className="py-2 px-4 border-b text-center">Lucro Esperado</th>
              <th className="py-2 px-4 border-b text-center">Risco</th>
            </tr>
          </thead>
          <tbody>
            {opportunities
              .filter((opportunity) => opportunity.status !== "solicited")
              .map((opportunity, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(opportunity)}
                  className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                >
                  <td className="py-2 px-4 border-b flex items-center">
                    <img
                      src={opportunity.picture}
                      alt={opportunity.user.name}
                      className="h-10 w-10 mr-2 rounded-full"
                    />
                    {opportunity.user.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {opportunity.duration}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    R${opportunity.amount}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {opportunity.interest_rate}%
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {`${parseFloat(opportunity.investor_profit ?? 0).toFixed(
                      2
                    )}R$`}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <span
                      className={`py-1 px-3 rounded-full ${getRiskColor(
                        opportunity.risk
                      )} ${opportunity.risk === "baixo"
                        ? "bg-green-100"
                        : opportunity.risk === "médio"
                          ? "bg-yellow-100"
                          : opportunity.risk === "alto"
                            ? "bg-red-100"
                            : ""
                        }`}
                    >
                      {opportunity.risk.charAt(0).toUpperCase() +
                        opportunity.risk.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Confirmação de Investimento
            </h2>
            <p>
              Tem certeza que deseja investir em {selectedOpportunity.user.name}
              ? Um contrato será gerado com mais informações.
            </p>
            <p className="mt-4 mb-4">
              Antes de confirmar seu investimento, por favor, leia e aceite
              nossos
              <a href="/termos" className="text-blue-500 underline ml-1">
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
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmInvestment}
                className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${!isTermsAccepted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={!isTermsAccepted}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <Chat />
      <Chart />
      <div className="w-full mt-[22px]">
        <h1 className="text-2xl font-bold mb-6">Ações em destaque</h1>
        {Array.isArray(stockSummaries) && stockSummaries.length > 0 ? (
          stockSummaries.map((stock) => (
            <StockSummaryAccordion key={stock.companyId} stockData={stock} />
          ))
        ) : (
          <p>Não foi possível carregar as ações, tente novamente mais tarde !</p> // ou algum outro placeholder de carregamento ou mensagem
        )}
      </div>
    </div>
  );
};

export default LoanOpportunities;
