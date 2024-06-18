import React, { useState, useEffect } from "react";
import perfil2 from "../../../assets/img2.png";
import perfil3 from "../../../assets/senhora.png";
import perfil4 from "../../../assets/mulher3.png";
import perfil5 from "../../../assets/images4.png";
import { FaRegCalendarMinus } from "react-icons/fa";
import Chart from "../../../pages/components/Chart";
import { toast } from "react-toastify";
import { p2pAxiosInstance } from "../../../utils/AxiosConfig";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        payment_id: 1,
        loan_id: 1,
        borrower_id: 1,
        installment_number: 1,
        amount: 1000,
        due_date: "2024-07-01",
        status: "pago",
        duration: 12,
        interest_rate: 5.0
      },
      {
        payment_id: 2,
        loan_id: 1,
        borrower_id: 1,
        installment_number: 2,
        amount: 1000,
        due_date: "2024-08-01",
        status: "pendente",
        duration: 12,
        interest_rate: 5.0
      },
      {
        payment_id: 3,
        loan_id: 2,
        borrower_id: 1,
        installment_number: 1,
        amount: 2000,
        due_date: "2024-07-15",
        status: "pago",
        duration: 24,
        interest_rate: 6.5
      },
    ];

    const groupedLoans = mockData.reduce((acc, loan) => {
      const { loan_id } = loan;
      if (!acc[loan_id]) {
        acc[loan_id] = [];
      }
      acc[loan_id].push(loan);
      return acc;
    }, {});

    setLoans(groupedLoans);
  }, []);

  const [expandedLoan, setExpandedLoan] = useState(null);

  const toggleExpand = (loanId) => {
    setExpandedLoan(expandedLoan === loanId ? null : loanId);
  };

  const calculateLoanSummary = (loanInstallments) => {
    const totalAmount = loanInstallments.reduce((acc, installment) => acc + installment.amount, 0);
    const duration = loanInstallments[0]?.duration || 0;
    const interestRate = loanInstallments[0]?.interest_rate || 0;
    const numberOfInstallments = loanInstallments.length;
    return { totalAmount, duration, interestRate, numberOfInstallments };
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Meus empréstimos</h1>
      </div>
      <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
        <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">EMPRÉSTIMOS REALIZADOS</h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">5</h1>
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
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">EMPRÉSTIMOS EM ANÁLISE</h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">0</h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg shadow-lg mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Duração (Meses)</th>
              <th className="py-2 px-4 border-b text-center">Valor Total</th>
              <th className="py-2 px-4 border-b text-center">Taxa de Juros</th>
              <th className="py-2 px-4 border-b text-center">Número de Parcelas</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(loans).map((loanId) => {
              const loanInstallments = loans[loanId];
              const { totalAmount, duration, interestRate, numberOfInstallments } = calculateLoanSummary(loanInstallments);
              return (
                <React.Fragment key={loanId}>
                  <tr className="cursor-pointer bg-gray-200 hover:bg-gray-300" onClick={() => toggleExpand(loanId)}>
                    <td className="py-2 px-4 border-b text-center">{duration}</td>
                    <td className="py-2 px-4 border-b text-center">R${totalAmount}</td>
                    <td className="py-2 px-4 border-b text-center">{interestRate}%</td>
                    <td className="py-2 px-4 border-b text-center">{numberOfInstallments}</td>
                  </tr>
                  {expandedLoan === loanId && (
                    <React.Fragment>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-center">Número da Parcela</th>
                        <th className="py-2 px-4 border-b text-center">Valor da Parcela</th>
                        <th className="py-2 px-4 border-b text-center">Status</th>
                        <th className="py-2 px-4 border-b text-center">Data de Vencimento</th>
                      </tr>
                      {loanInstallments.map((installment) => (
                        <tr key={installment.payment_id} className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                          <td className="py-2 px-4 border-b text-center">{installment.installment_number}</td>
                          <td className="py-2 px-4 border-b text-center">R${installment.amount}</td>
                          <td className="py-2 px-4 border-b text-center">{installment.status}</td>
                          <td className="py-2 px-4 border-b text-center">{new Date(installment.due_date).toLocaleDateString()}</td>
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
      <Chart />
    </div>
  );
};

export default MyLoans;