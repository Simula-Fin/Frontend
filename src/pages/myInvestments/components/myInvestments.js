import React, { useState, useEffect, useCallback } from "react";
import { FaDownload } from "react-icons/fa";
import Chart from "../../../pages/components/Chart";
import Graphics from "../../../pages/components/Graphics";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { StockSummaryAccordion } from "../../components/StockAccordion";
import { p2pAxiosInstance, stockAxiosInstance } from "../../../utils/AxiosConfig";
import {
  createMockContract,
  generatePDF,
} from "../../../utils/generateContract";
import QRCode from "react-qr-code";

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

  // const stocks = async (email, password) => {
  //   try {
  //     const response = await stockAxiosInstance.get('/api/stocks/stock-summary/{BBAS3}',);
  //     console.log('Response ação: ', response.data);
    

  //   } catch (error) {
  //     console.error('Erro ao fazer login:', error);
  //   }
  // };

  const fetchStockSummary = async (ticker) => {
    const url = `https://stock-api-f7tht.ondigitalocean.app/api/stocks/stock-summary/${ticker}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: "follow"
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Response ação: ', data);
  
    } catch (error) {
      console.error('Erro ao buscar os dados da ação:', error);
    }
  };
  
  fetchStockSummary('BBAS3');

  const mockStocks = [
    {
      "ticker":"PETR3",
      "currentPrice":42.01,
      "companyName":"PETROLEO BRASILEIRO S.A. PETROBRAS",
      "companyId":216,
      "freeFloat":63.39,
      "tagAlong":100.00,
      "avgDailyLiquidity":548971000,
      "categorie":"SMALL",
      "variationOneDay":0.0000,
      "variationOneMonth":0.0000,
      "variationTwelveMonths":41.8400,
      "allPrices":[
        {"value":22.019091542588,"priceDate":"2023-05-06"},{"value":22.019091542588,"priceDate":"2023-05-07"},{"value":22.356076519537,"priceDate":"2023-05-08"},{"value":22.561555164018,"priceDate":"2023-05-09"},{"value":22.676623204927,"priceDate":"2023-05-10"},{"value":23.219086826357,"priceDate":"2023-05-11"},{"value":23.917714217593,"priceDate":"2023-05-12"},{"value":23.95059080071,"priceDate":"2023-05-13"},{"value":23.95059080071,"priceDate":"2023-05-14"},{"value":23.465661199734,"priceDate":"2023-05-15"},{"value":24.05743969584,"priceDate":"2023-05-16"},{"value":23.95059080071,"priceDate":"2023-05-17"},{"value":23.999905675385,"priceDate":"2023-05-18"},{"value":23.991686529606,"priceDate":"2023-05-19"},{"value":24.073877987398,"priceDate":"2023-05-20"},{"value":24.073877987398,"priceDate":"2023-05-21"},{"value":23.712235573112,"priceDate":"2023-05-22"},{"value":24.246480048762,"priceDate":"2023-05-23"},{"value":24.509492713698,"priceDate":"2023-05-24"},{"value":24.279356631879,"priceDate":"2023-05-25"},{"value":24.665656483504,"priceDate":"2023-05-26"},{"value":24.690313920841,"priceDate":"2023-05-27"},{"value":24.690313920841,"priceDate":"2023-05-28"},{"value":24.509492713698,"priceDate":"2023-05-29"},{"value":24.279356631879,"priceDate":"2023-05-30"},{"value":24.008124821164,"priceDate":"2023-05-31"},{"value":24.673875629283,"priceDate":"2023-06-01"},{"value":25.02729889779,"priceDate":"2023-06-02"},{"value":25.002641460453,"priceDate":"2023-06-03"},{"value":25.002641460453,"priceDate":"2023-06-04"},{"value":25.1423669387,"priceDate":"2023-06-05"},{"value":25.67661141435,"priceDate":"2023-06-06"},{"value":26.457430263378,"priceDate":"2023-06-07"},{"value":26.465649409158,"priceDate":"2023-06-08"},{"value":27.616329818251,"priceDate":"2023-06-09"},{"value":27.73961700494,"priceDate":"2023-06-10"},{"value":27.73961700494,"priceDate":"2023-06-11"},{"value":29.915441243113,"priceDate":"2023-06-12"},{"value":28.255413837684,"priceDate":"2023-06-13"},{"value":29.356274117074,"priceDate":"2023-06-14"},{"value":29.085427540398,"priceDate":"2023-06-15"},{"value":29.260167267286,"priceDate":"2023-06-16"},{"value":29.172797403842,"priceDate":"2023-06-17"},{"value":29.172797403842,"priceDate":"2023-06-18"},{"value":29.854282338703,"priceDate":"2023-06-19"},{"value":29.880493297736,"priceDate":"2023-06-20"},{"value":31.147356317669,"priceDate":"2023-06-21"},{"value":30.78913987755,"priceDate":"2023-06-22"},{"value":29.54848781665,"priceDate":"2023-06-23"},{"value":29.618383707405,"priceDate":"2023-06-24"},{"value":29.618383707405,"priceDate":"2023-06-25"},{"value":30.195024806133,"priceDate":"2023-06-26"},{"value":29.932915215802,"priceDate":"2023-06-27"},{"value":30.151339874411,"priceDate":"2023-06-28"},{"value":30.483345355497,"priceDate":"2023-06-29"},{"value":28.919424799855,"priceDate":"2023-06-30"},{"value":28.919424799855,"priceDate":"2023-07-01"},{"value":28.919424799855,"priceDate":"2023-07-02"},{"value":29.417433021484,"priceDate":"2023-07-03"},{"value":29.487328912239,"priceDate":"2023-07-04"},{"value":29.478591925895,"priceDate":"2023-07-05"},{"value":29.102901513087,"priceDate":"2023-07-06"},{"value":28.945635758889,"priceDate":"2023-07-07"},{"value":28.945635758889,"priceDate":"2023-07-08"},{"value":28.945635758889,"priceDate":"2023-07-09"},{"value":28.945635758889,"priceDate":"2023-07-10"},{"value":28.718474113935,"priceDate":"2023-07-11"},{"value":28.631104250491,"priceDate":"2023-07-12"},{"value":29.050479595021,"priceDate":"2023-07-13"},{"value":28.438890550915,"priceDate":"2023-07-14"},{"value":28.438890550915,"priceDate":"2023-07-15"},{"value":28.438890550915,"priceDate":"2023-07-16"},{"value":28.44762753726,"priceDate":"2023-07-17"},{"value":28.202991919617,"priceDate":"2023-07-18"},{"value":28.360257673816,"priceDate":"2023-07-19"},{"value":28.578682332425,"priceDate":"2023-07-20"},{"value":29.102901513087,"priceDate":"2023-07-21"},{"value":29.102901513087,"priceDate":"2023-07-22"},{"value":29.102901513087,"priceDate":"2023-07-23"},{"value":29.705753570848,"priceDate":"2023-07-24"},{"value":30.238709737855,"priceDate":"2023-07-25"},{"value":30.107654942689,"priceDate":"2023-07-26"},{"value":28.412679591882,"priceDate":"2023-07-27"},{"value":28.893213840822,"priceDate":"2023-07-28"},{"value":28.893213840822,"priceDate":"2023-07-29"},{"value":28.893213840822,"priceDate":"2023-07-30"},{"value":30.413449464742,"priceDate":"2023-07-31"},{"value":29.775649461603,"priceDate":"2023-08-01"},{"value":29.565961789339,"priceDate":"2023-08-02"},{"value":29.985337133868,"priceDate":"2023-08-03"},{"value":28.727211100279,"priceDate":"2023-08-04"},{"value":28.727211100279,"priceDate":"2023-08-05"},{"value":28.919424799855,"priceDate":"2023-08-07"},{"value":28.901950827167,"priceDate":"2023-08-08"},{"value":29.233956308253,"priceDate":"2023-08-09"},{"value":29.225219321908,"priceDate":"2023-08-10"},{"value":29.242693294597,"priceDate":"2023-08-11"},{"value":29.242693294597,"priceDate":"2023-08-12"},{"value":29.242693294597,"priceDate":"2023-08-13"},{"value":29.382485076107,"priceDate":"2023-08-14"},{"value":29.321326171696,"priceDate":"2023-08-15"},{"value":30.186287819789,"priceDate":"2023-08-16"},{"value":29.959126174835,"priceDate":"2023-08-17"},{"value":30.133865901722,"priceDate":"2023-08-18"},{"value":30.081443983656,"priceDate":"2023-08-19"},{"value":30.081443983656,"priceDate":"2023-08-20"},{"value":30.881580238728,"priceDate":"2023-08-21"},{"value":30.293790278108,"priceDate":"2023-08-22"},{"value":32.020988470083,"priceDate":"2023-08-23"},{"value":31.939602167844,"priceDate":"2023-08-24"},{"value":31.695443261125,"priceDate":"2023-08-25"},{"value":31.686400338654,"priceDate":"2023-08-26"},{"value":31.686400338654,"priceDate":"2023-08-27"},{"value":32.011945547612,"priceDate":"2023-08-28"},{"value":32.129503539736,"priceDate":"2023-08-29"},{"value":32.102374772323,"priceDate":"2023-08-30"},{"value":31.2342542151,"priceDate":"2023-08-31"},{"value":32.274190299274,"priceDate":"2023-09-01"},{"value":32.274190299274,"priceDate":"2023-09-02"},{"value":32.274190299274,"priceDate":"2023-09-03"},{"value":31.831087098191,"priceDate":"2023-09-04"},{"value":33.296040538505,"priceDate":"2023-09-05"},{"value":33.458813142985,"priceDate":"2023-09-06"},{"value":33.458813142985,"priceDate":"2023-09-07"},{"value":33.196568391323,"priceDate":"2023-09-08"},{"value":33.196568391323,"priceDate":"2023-09-09"},{"value":33.196568391323,"priceDate":"2023-09-10"},{"value":32.970495329547,"priceDate":"2023-09-11"},{"value":33.33221222839,"priceDate":"2023-09-12"},{"value":32.898151949778,"priceDate":"2023-09-13"},{"value":33.865744654183,"priceDate":"2023-09-14"},{"value":33.368383918274,"priceDate":"2023-09-15"},{"value":33.368383918274,"priceDate":"2023-09-16"},{"value":33.368383918274,"priceDate":"2023-09-17"},{"value":33.784358351943,"priceDate":"2023-09-18"},{"value":33.784358351943,"priceDate":"2023-09-19"},{"value":33.829572964299,"priceDate":"2023-09-20"},{"value":33.341255150861,"priceDate":"2023-09-21"},{"value":33.58541405758,"priceDate":"2023-09-22"},{"value":33.58541405758,"priceDate":"2023-09-23"},{"value":33.58541405758,"priceDate":"2023-09-24"},{"value":33.802444196886,"priceDate":"2023-09-25"},{"value":32.871023182365,"priceDate":"2023-09-26"},{"value":34.09181771596,"priceDate":"2023-09-27"},{"value":33.92000218901,"priceDate":"2023-09-28"},{"value":34.263633242911,"priceDate":"2023-09-29"},{"value":34.263633242911,"priceDate":"2023-09-30"},{"value":34.263633242911,"priceDate":"2023-10-01"},{"value":33.612542824993,"priceDate":"2023-10-02"},{"value":33.214654236266,"priceDate":"2023-10-03"},{"value":32.210889841976,"priceDate":"2023-10-04"},{"value":32.138546462207,"priceDate":"2023-10-05"},{"value":32.889109027307,"priceDate":"2023-10-06"},{"value":32.889109027307,"priceDate":"2023-10-07"},{"value":32.889109027307,"priceDate":"2023-10-08"},{"value":34.236504475497,"priceDate":"2023-10-09"},{"value":34.589178451869,"priceDate":"2023-10-10"},{"value":34.471620459745,"priceDate":"2023-10-11"},{"value":34.471620459745,"priceDate":"2023-10-12"},{"value":35.556771156275,"priceDate":"2023-10-13"},{"value":35.556771156275,"priceDate":"2023-10-14"},{"value":35.556771156275,"priceDate":"2023-10-15"},{"value":35.909445132647,"priceDate":"2023-10-16"},{"value":36.723308155043,"priceDate":"2023-10-17"},{"value":37.582385789796,"priceDate":"2023-10-18"},{"value":37.311098115663,"priceDate":"2023-10-19"},{"value":36.904166604465,"priceDate":"2023-10-20"},{"value":36.904166604465,"priceDate":"2023-10-21"},{"value":36.904166604465,"priceDate":"2023-10-22"},{"value":34.67960767658,"priceDate":"2023-10-23"},{"value":35.213140102374,"priceDate":"2023-10-24"},{"value":35.312612249555,"priceDate":"2023-10-25"},{"value":35.050367497894,"priceDate":"2023-10-26"},{"value":34.797165668704,"priceDate":"2023-10-27"},{"value":34.797165668704,"priceDate":"2023-10-28"},{"value":34.797165668704,"priceDate":"2023-10-29"},{"value":34.516835072101,"priceDate":"2023-10-30"},{"value":34.218418630555,"priceDate":"2023-10-31"},{"value":34.616307219283,"priceDate":"2023-11-01"},{"value":34.616307219283,"priceDate":"2023-11-02"},{"value":34.905680738357,"priceDate":"2023-11-03"},{"value":34.905680738357,"priceDate":"2023-11-04"},{"value":34.905680738357,"priceDate":"2023-11-05"},{"value":34.815251513646,"priceDate":"2023-11-06"},{"value":34.046603103605,"priceDate":"2023-11-07"},{"value":33.241783003679,"priceDate":"2023-11-08"},{"value":33.947130956423,"priceDate":"2023-11-09"},{"value":33.83861588677,"priceDate":"2023-11-10"},{"value":33.83861588677,"priceDate":"2023-11-11"},{"value":33.83861588677,"priceDate":"2023-11-12"},{"value":34.59822137434,"priceDate":"2023-11-13"},{"value":34.996109963068,"priceDate":"2023-11-14"},{"value":34.290762010324,"priceDate":"2023-11-16"},{"value":36.10838942701,"priceDate":"2023-11-17"},{"value":36.10838942701,"priceDate":"2023-11-18"},{"value":36.10838942701,"priceDate":"2023-11-19"},{"value":35.620071613572,"priceDate":"2023-11-20"},{"value":36.452777050456,"priceDate":"2023-11-21"},{"value":35.228337616197,"priceDate":"2023-11-22"},{"value":35.387234336674,"priceDate":"2023-11-23"},{"value":35.28441881166,"priceDate":"2023-11-24"},{"value":35.28441881166,"priceDate":"2023-11-25"},{"value":35.28441881166,"priceDate":"2023-11-26"},{"value":35.0507471639,"priceDate":"2023-11-27"},{"value":35.377887470763,"priceDate":"2023-11-28"},{"value":34.910544175245,"priceDate":"2023-11-29"},{"value":35.237684482108,"priceDate":"2023-11-30"},{"value":34.770341186589,"priceDate":"2023-12-01"},{"value":34.770341186589,"priceDate":"2023-12-02"},{"value":34.770341186589,"priceDate":"2023-12-03"},{"value":34.088019975132,"priceDate":"2023-12-04"},{"value":33.835654595552,"priceDate":"2023-12-05"},{"value":33.03182412726,"priceDate":"2023-12-06"},{"value":33.134639652274,"priceDate":"2023-12-07"},{"value":34.265610427429,"priceDate":"2023-12-08"},{"value":34.265610427429,"priceDate":"2023-12-09"},{"value":34.265610427429,"priceDate":"2023-12-10"},{"value":34.162794902415,"priceDate":"2023-12-11"},{"value":33.732839070538,"priceDate":"2023-12-12"},{"value":34.088019975132,"priceDate":"2023-12-13"},{"value":34.882503577514,"priceDate":"2023-12-14"},{"value":34.583403868382,"priceDate":"2023-12-15"},{"value":34.583403868382,"priceDate":"2023-12-16"},{"value":34.583403868382,"priceDate":"2023-12-17"},{"value":35.321806275301,"priceDate":"2023-12-18"},{"value":35.55547792306,"priceDate":"2023-12-19"},{"value":35.620905984433,"priceDate":"2023-12-20"},{"value":35.620905984433,"priceDate":"2023-12-21"},{"value":36.097596145862,"priceDate":"2023-12-22"},{"value":36.097596145862,"priceDate":"2023-12-23"},{"value":36.097596145862,"priceDate":"2023-12-24"},{"value":36.097596145862,"priceDate":"2023-12-25"},{"value":36.639714368664,"priceDate":"2023-12-26"},{"value":36.583633173202,"priceDate":"2023-12-27"},{"value":36.434083318636,"priceDate":"2023-12-28"},{"value":36.78926422323,"priceDate":"2024-01-02"},{"value":38.04174425522,"priceDate":"2024-01-03"},{"value":37.424851105135,"priceDate":"2024-01-04"},{"value":37.751991411998,"priceDate":"2024-01-05"},{"value":37.751991411998,"priceDate":"2024-01-06"},{"value":37.751991411998,"priceDate":"2024-01-07"},{"value":37.05097646872,"priceDate":"2024-01-08"},{"value":36.845345418692,"priceDate":"2024-01-09"},{"value":36.480817648187,"priceDate":"2024-01-10"},{"value":36.854692284602,"priceDate":"2024-01-11"},{"value":37.05097646872,"priceDate":"2024-01-12"},{"value":37.05097646872,"priceDate":"2024-01-13"},{"value":37.05097646872,"priceDate":"2024-01-14"},{"value":37.424851105135,"priceDate":"2024-01-15"},{"value":37.013589005079,"priceDate":"2024-01-16"},{"value":36.705142430036,"priceDate":"2024-01-17"},{"value":36.434083318636,"priceDate":"2024-01-18"},{"value":36.209758536787,"priceDate":"2024-01-19"},{"value":36.209758536787,"priceDate":"2024-01-20"},{"value":36.209758536787,"priceDate":"2024-01-21"},{"value":36.490164514098,"priceDate":"2024-01-22"},{"value":37.022935870989,"priceDate":"2024-01-23"},{"value":36.677101832305,"priceDate":"2024-01-24"},{"value":38.378231427993,"priceDate":"2024-01-25"},{"value":39.219449359927,"priceDate":"2024-01-26"},{"value":39.219449359927,"priceDate":"2024-01-27"},{"value":39.219449359927,"priceDate":"2024-01-28"},{"value":39.593323996342,"priceDate":"2024-01-29"},{"value":39.415733544045,"priceDate":"2024-01-30"},{"value":39.406386678134,"priceDate":"2024-01-31"},{"value":40.154135950964,"priceDate":"2024-02-01"},{"value":39.565283398611,"priceDate":"2024-02-02"},{"value":39.565283398611,"priceDate":"2024-02-03"},{"value":39.565283398611,"priceDate":"2024-02-04"},{"value":39.565283398611,"priceDate":"2024-02-05"},{"value":40.163482816875,"priceDate":"2024-02-06"},{"value":40.5467043192,"priceDate":"2024-02-07"},{"value":40.406501330544,"priceDate":"2024-02-08"},{"value":39.957851766846,"priceDate":"2024-02-09"},{"value":39.957851766846,"priceDate":"2024-02-10"},{"value":39.957851766846,"priceDate":"2024-02-11"},{"value":39.957851766846,"priceDate":"2024-02-12"},{"value":39.957851766846,"priceDate":"2024-02-13"},{"value":39.54658966679,"priceDate":"2024-02-14"},{"value":40.668213576035,"priceDate":"2024-02-15"},{"value":41.331841055671,"priceDate":"2024-02-16"},{"value":41.331841055671,"priceDate":"2024-02-17"},{"value":41.331841055671,"priceDate":"2024-02-18"},{"value":41.584206435251,"priceDate":"2024-02-19"},{"value":40.752335369228,"priceDate":"2024-02-20"},{"value":40.855150894242,"priceDate":"2024-02-21"},{"value":40.883191491973,"priceDate":"2024-02-22"},{"value":40.640172978304,"priceDate":"2024-02-23"},{"value":40.640172978304,"priceDate":"2024-02-24"},{"value":40.640172978304,"priceDate":"2024-02-25"},{"value":41.200984932926,"priceDate":"2024-02-26"},{"value":41.098169407912,"priceDate":"2024-02-27"},{"value":38.882962187153,"priceDate":"2024-02-28"},{"value":38.882962187153,"priceDate":"2024-02-29"},{"value":38.527781282559,"priceDate":"2024-03-01"},{"value":38.518434416649,"priceDate":"2024-03-02"},{"value":38.518434416649,"priceDate":"2024-03-03"},{"value":38.518434416649,"priceDate":"2024-03-04"},{"value":38.135212914324,"priceDate":"2024-03-05"},{"value":38.78949352805,"priceDate":"2024-03-06"},{"value":38.565168746201,"priceDate":"2024-03-07"},{"value":34.564710136561,"priceDate":"2024-03-08"},{"value":34.564710136561,"priceDate":"2024-03-09"},{"value":34.564710136561,"priceDate":"2024-03-10"},{"value":33.901082656924,"priceDate":"2024-03-11"},{"value":34.929237907065,"priceDate":"2024-03-12"},{"value":34.583403868382,"priceDate":"2024-03-13"},{"value":34.349732220622,"priceDate":"2024-03-14"},{"value":34.274957293339,"priceDate":"2024-03-15"},{"value":34.274957293339,"priceDate":"2024-03-16"},{"value":34.274957293339,"priceDate":"2024-03-17"},{"value":34.564710136561,"priceDate":"2024-03-18"},{"value":34.181488634236,"priceDate":"2024-03-19"},{"value":34.891850443424,"priceDate":"2024-03-20"},{"value":34.181488634236,"priceDate":"2024-03-21"},{"value":34.452547745636,"priceDate":"2024-03-22"},{"value":34.452547745636,"priceDate":"2024-03-23"},{"value":34.452547745636,"priceDate":"2024-03-24"},{"value":34.882503577514,"priceDate":"2024-03-25"},{"value":34.499282075188,"priceDate":"2024-03-26"},{"value":34.919891041155,"priceDate":"2024-03-27"},{"value":35.742415241268,"priceDate":"2024-03-28"},{"value":35.742415241268,"priceDate":"2024-03-29"},{"value":35.742415241268,"priceDate":"2024-03-30"},{"value":35.742415241268,"priceDate":"2024-03-31"},{"value":36.0415149504,"priceDate":"2024-04-01"},{"value":37.022935870989,"priceDate":"2024-04-02"},{"value":36.733183027768,"priceDate":"2024-04-03"},{"value":36.564939441381,"priceDate":"2024-04-04"},{"value":36.490164514098,"priceDate":"2024-04-05"},{"value":36.490164514098,"priceDate":"2024-04-06"},{"value":36.490164514098,"priceDate":"2024-04-07"},{"value":37.013589005079,"priceDate":"2024-04-08"},{"value":37.200526323286,"priceDate":"2024-04-09"},{"value":38.322150232531,"priceDate":"2024-04-10"},{"value":37.976316193847,"priceDate":"2024-04-11"},{"value":37.667869618805,"priceDate":"2024-04-12"},{"value":37.667869618805,"priceDate":"2024-04-13"},{"value":37.667869618805,"priceDate":"2024-04-14"},{"value":38.05109112113,"priceDate":"2024-04-15"},{"value":38.406272025724,"priceDate":"2024-04-16"},{"value":38.462353221187,"priceDate":"2024-04-17"},{"value":38.368884562083,"priceDate":"2024-04-18"},{"value":39.929811169115,"priceDate":"2024-04-19"},{"value":39.929811169115,"priceDate":"2024-04-20"},{"value":39.929811169115,"priceDate":"2024-04-21"},{"value":40.901885223794,"priceDate":"2024-04-22"},{"value":40.621479246483,"priceDate":"2024-04-23"},{"value":40.443888794186,"priceDate":"2024-04-24"},{"value":42.459183204997,"priceDate":"2024-04-25"},{"value":41.97941842302,"priceDate":"2024-04-26"},{"value":41.97941842302,"priceDate":"2024-04-27"},{"value":41.97941842302,"priceDate":"2024-04-28"},{"value":42.737446778544,"priceDate":"2024-04-29"},{"value":42.468778500637,"priceDate":"2024-04-30"},{"value":42.468778500637,"priceDate":"2024-05-01"},{"value":44.43,"priceDate":"2024-05-02"},{"value":42.01,"priceDate":"2024-05-03"},{"value":42.01,"priceDate":"2024-05-04"},{"value":42.01,"priceDate":"2024-05-05"}
      ]
    },  
    {
      "ticker": "AAPL",
      "currentPrice": 145.32,
      "companyName": "Apple Inc.",
      "companyId": 1,
      "freeFloat": 84.12,
      "tagAlong": 100,
      "avgDailyLiquidity": 30000000,
      "categorie": "Technology",
      "variationOneDay": 1.24,
      "variationOneMonth": 5.67,
      "variationTwelveMonths": 28.34,
      "allPrices": [
        { "value": 145.32, "priceDate": "2024-06-01" },
        { "value": 144.75, "priceDate": "2024-05-31" },
        { "value": 143.65, "priceDate": "2024-05-30" },
        { "value": 142.85, "priceDate": "2024-05-29" },
        { "value": 141.95, "priceDate": "2024-05-28" }
      ]
    },
    {
      "ticker": "MSFT",
      "currentPrice": 300.15,
      "companyName": "Microsoft Corporation",
      "companyId": 2,
      "freeFloat": 75.23,
      "tagAlong": 90,
      "avgDailyLiquidity": 25000000,
      "categorie": "Technology",
      "variationOneDay": 0.95,
      "variationOneMonth": 4.12,
      "variationTwelveMonths": 22.45,
      "allPrices": [
        { "value": 300.15, "priceDate": "2024-06-01" },
        { "value": 299.50, "priceDate": "2024-05-31" },
        { "value": 298.75, "priceDate": "2024-05-30" },
        { "value": 297.85, "priceDate": "2024-05-29" },
        { "value": 296.95, "priceDate": "2024-05-28" }
      ]
    },
    {
      "ticker": "GOOGL",
      "currentPrice": 2750.50,
      "companyName": "Alphabet Inc.",
      "companyId": 3,
      "freeFloat": 60.00,
      "tagAlong": 85,
      "avgDailyLiquidity": 18000000,
      "categorie": "Technology",
      "variationOneDay": 1.10,
      "variationOneMonth": 3.45,
      "variationTwelveMonths": 25.60,
      "allPrices": [
        { "value": 2750.50, "priceDate": "2024-06-01" },
        { "value": 2740.00, "priceDate": "2024-05-31" },
        { "value": 2730.75, "priceDate": "2024-05-30" },
        { "value": 2720.85, "priceDate": "2024-05-29" },
        { "value": 2710.95, "priceDate": "2024-05-28" }
      ]
    },
    {
      "ticker": "AMZN",
      "currentPrice": 3450.20,
      "companyName": "Amazon.com Inc.",
      "companyId": 4,
      "freeFloat": 85.00,
      "tagAlong": 95,
      "avgDailyLiquidity": 22000000,
      "categorie": "Consumer Discretionary",
      "variationOneDay": 2.00,
      "variationOneMonth": 6.00,
      "variationTwelveMonths": 30.50,
      "allPrices": [
        { "value": 3450.20, "priceDate": "2024-06-01" },
        { "value": 3440.75, "priceDate": "2024-05-31" },
        { "value": 3430.65, "priceDate": "2024-05-30" },
        { "value": 3420.85, "priceDate": "2024-05-29" },
        { "value": 3410.95, "priceDate": "2024-05-28" }
      ]
    },
    {
      "ticker": "TSLA",
      "currentPrice": 800.10,
      "companyName": "Tesla Inc.",
      "companyId": 5,
      "freeFloat": 70.00,
      "tagAlong": 100,
      "avgDailyLiquidity": 15000000,
      "categorie": "Automotive",
      "variationOneDay": 1.75,
      "variationOneMonth": 7.25,
      "variationTwelveMonths": 35.75,
      "allPrices": [
        { "value": 800.10, "priceDate": "2024-06-01" },
        { "value": 795.50, "priceDate": "2024-05-31" },
        { "value": 790.75, "priceDate": "2024-05-30" },
        { "value": 785.85, "priceDate": "2024-05-29" },
        { "value": 780.95, "priceDate": "2024-05-28" }
      ]
    }
  ];

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
                            R${installment.amount}
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
      <Chart />
      <div className="w-full mt-[22px]">
        <h1 className="text-2xl font-bold mb-6">Ações em destaque</h1>
        { mockStocks.map(stock => (
          <StockSummaryAccordion key={stock.companyId} stockData={stock} />
        ))}
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
    </div>
  );
};

export default MyInvestments;
