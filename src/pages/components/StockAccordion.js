import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const StockSummaryAccordion = ({ stockData }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const data = {
      labels: stockData.allPrices.map(price => new Date(price.priceDate).toLocaleDateString()),
      datasets: [
        {
          label: 'Preço',
          data: stockData.allPrices.map(price => price.value),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  
    return (
        <div className="border bg-white shadow-md cursor-pointer rounded-[4px] mb-[10px] w-full mx-auto">
          <div
            className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center">
              <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
              {stockData.companyName} ({stockData.ticker})
              </h2>
              <p className="ml-[10px] text-[16px]">R${stockData.currentPrice.toFixed(2)}</p>
            </div>
            {isOpen ? <FaChevronUp color="gray" /> : <FaChevronDown color="gray" />}
          </div>
          {isOpen && (
            <div className="px-[20px] py-[10px]">
              <h3 className="text-[#4e73df] text-[16px] leading-[19px] font-bold mb-4">Histórico de Preços</h3>
              <div className="relative h-[200px]">
                <Line data={data} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          )}
        </div>
      );
    };