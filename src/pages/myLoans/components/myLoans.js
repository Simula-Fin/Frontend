import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import perfil2 from "../../../assets/img2.png";
import perfil3 from "../../../assets/senhora.png";
import perfil4 from "../../../assets/mulher3.png";
import perfil5 from "../../../assets/images4.png";
import logo from "../../../assets/logoBank.jpg";
import { FaRegCalendarMinus } from "react-icons/fa";
import Chart from "../../../pages/components/Chart";
import { toast } from "react-toastify";
import { p2pAxiosInstance } from "../../../utils/AxiosConfig";

const MyLoans = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const pictures = [perfil2, perfil3, perfil4, perfil5];
    const fetchOpportunities = async () => {
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
    };

    fetchOpportunities();
  }, []);

  const getRiskLevel = (riskScore) => {
    if (riskScore < 30) return "baixo";
    if (riskScore >= 30 && riskScore <= 60) return "médio";
    return "alto";
  };

  // const getRiskColor = (risk) => {
  //   switch (risk) {
  //     case "baixo":
  //       return "text-green-500";
  //     case "médio":
  //       return "text-yellow-500";
  //     case "alto":
  //       return "text-red-500";
  //     default:
  //       return "";
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Meus empréstimos</h1>
      </div>
      <>
             <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
              EMPRÉSTIMOS REALIZADOS
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              5
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color="" />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              RENDA EMPREGADA
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              R$1750.00
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              LUCRO ESTIMADO (MÊS){" "}
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              R$175.00
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              EMPRÉSTIMOS EM ANÁLISE
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              0
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
      </div>
        </>
      <div className="overflow-hidden rounded-lg shadow-lg mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">
                Duração (Meses)
              </th>
              <th className="py-2 px-4 border-b text-center">Valor</th>
              <th className="py-2 px-4 border-b text-center">Taxa de Juros</th>
              <th className="py-2 px-4 border-b text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity, index) => (
              <tr
                key={index}
                // onClick={() => handleRowClick(opportunity)}
                className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                {/* <td className="py-2 px-4 border-b flex items-center">
                  <img
                    src={opportunity.picture}
                    alt={opportunity.user.name}
                    className="h-10 w-10 mr-2 rounded-full"
                  />
                  {opportunity.user.name}
                </td> */}
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
                  {opportunity.status}
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Chart />
    </div>
  );
};

export default MyLoans;
