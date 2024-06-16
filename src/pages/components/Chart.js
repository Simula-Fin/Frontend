import { FaEllipsisV } from "react-icons/fa";
import { Progress } from 'antd';
const Chart = () => {
  return (
    <>
      <div className="flex mt-[22px] w-full gap-[30px]">
        <div className="basis-[55%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
              Investimentos do Momento
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="px-[25px] space-y-[15px] py-[15px]">
            <div>
              <h2>POUPANÇA</h2>
              <Progress percent={30} strokeColor="#E74A3B" />
            </div>
            <div>
              <h2>LCI/LCA</h2>
              <Progress percent={50} status="active" strokeColor="#F6C23E" />
            </div>
            <div>
              <h2>CDI</h2>
              <Progress percent={70} status="active" strokeColor="#4E73DF" />
            </div>
            <div>
              <h2>Nossa rede P2P</h2>
              <Progress percent={100} strokeColor="#36B9CC" />
            </div>
            <div>
              <h2>CRIPTOS</h2>
              <Progress percent={50} status="exception" strokeColor="#1CC88A" />
            </div>
          </div>
        </div>
        <div className="basis-[45%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
              {" "}
              Chat Bot (Tire suas dúvidas aqui!)
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="pl-[35px] flex items-center justify-center h-[100%]">
            <div>
              <p className="mt-[15px] text-semibold text-gray-500">
                No data available
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
