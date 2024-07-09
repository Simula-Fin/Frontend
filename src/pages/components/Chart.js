import { FaEllipsisV } from "react-icons/fa";
import { PiKeyDuotone } from "react-icons/pi";
import React, { useState } from 'react';
import { Progress } from 'antd';

const Chart = () => {
  const public_key = "2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d494942496a414e42676b71686b6947397730424151454641414f43415138414d49494243674b434151454130716f746137412f424472442b736742344958630a6f696b5443796b723945794e6f7137417964574b4b4434776235544e752b344f2b2b7533756b4e33714b5771623235733956362f4f4d586f575065696a7a42530a7252384d48585177446c394272734d3475467738705474416443695776424f796b34464b4a33425453734a6a504777436a744f3365494731356e5a357a6553310a674373363049424a664d4a3859764a724b655351316a457372706c426c4d7961757646783058562f4457516f6c433552505269773270386b684f4762757871310a5534576875496e74452f4b436a62736c6c626c4f394e6754354d4d70653662655a4b364171636d55322f7a33484a484a702f512b6e722f3271796964543648550a64784d444c547977795667624a456f6675617a364a49746d5959496838715678373134542b413154572b56504f467854623379592f377232336d68774d7262780a59774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a";
  const private_key = "2d2d2d2d2d424547494e2050524956415445204b45592d2d2d2d2d0a4d494945765149424144414e42676b71686b6947397730424151454641415343424b63776767536a41674541416f49424151445371693172734438454f7350360a79414867686479694b524d4c4b537630544932697273444a31596f6f506a42766c4d323737673737363765365133656f70617076626d7a3158723834786568590a39364b504d464b74487777646444414f58304775777a69345844796c4f3042304b4a613845374b5467556f6e63464e4b776d4d3862414b4f303764346762586d0a646e6e4e354c57414b7a725167456c38776e7869386d7370354a44574d5379756d5547557a4a7136385848526458384e5a4369554c6c4539474c44616e7953450a345a7537477256546861473469653054386f4b4e75795756755537303242506b77796c377074356b726f4370795a54622f5063636b636d6e39443665762f61720a4b4a31506f64523345774d74504c444a5742736b53682b3572506f6b69325a6867694879705848765868503444564e623555383458464e76664a6a2f757662650a614841797476466a41674d42414145436767454150396866683647556c35325077374e57446b764467456e6567615671737446346f334d2b376d7950514838490a677569674b584b4f692f37325962634d7a736e576934723137713957574d68794548534d6963546c615a35644e35663838483469452b734b683655386f2f372f0a4737557061627132686b6e4b78595566575372736c47565071535731467771497246332f7345792b5453664d33562f6a3562477a7250453356537a3255464e740a3959312f626c6b5439476536573448536a4d545a743275516e39344a36705950786a772b6841442f573831524f4b54565a45656977563163504a5857576164730a437a4633786442312f4c4a487a4d564e355a4d4e72346179494b463457352f4d4339357539614e5856425765365a36366c6c535743526b6c66665a44666242660a43487a2f797676425652686e444b6770574c7676614376706c3839394f513369586851525a536a4c49514b42675144314670566a7146556d49682f53496645650a706c782f776373794a633974556b37396d56582b702b58496d5039506d2b645a64415250776b4d655473637832537545494754593045375063766d467a6c4b530a566a564d432b39574b7572512f724331664b43737a37344964306d795979466b587346774b69554b6e3570464b71694b644b556a796e363933764141624c54430a54567759554557576944346b6547474a46514b6b576234794f514b4267514463437a2f4a7167356f494973636961576e736b69437043302b774f56676d684d480a4c776756304c7464554f647752634144742b5141754b5a48634636746b755a4f307836686e76354e616a427a456c7546704b7a6c415a4e4d56797967783772500a67585046506b36626e787475567a676b4b646865396c6363457366315375484b2b6d567563676c51416d4a73516848564258394a786b324531777167334245680a48374a436e62745165774b426742416b376242443357414772577674476e4833615735732b4a4b55465162526669794d566a4c52496e7a46503051694d2b6f620a6a31456c7263416f566b7939546e57456f4c2f37634d57506745704648674650746e454d3944594c32363371715038376432594b78537a506c735975613375750a466a5871514d686a58516b6a567a6a506d445530574962765559586c6f7a364e552f797942504e3268416c6f2b4a764d433447422b39705a416f47414d7332610a465a706770795055576d74685272312f786b485866475357304e3368784d6655437731644a4f6458392f447971796b617942765a7343612b6854366b5539436b0a67745974696e7759345968386676654e50335a45707478396e6b5665325366664c637637354377773769485041584a7a315544307a624e3858534c447a4e52510a394e5835566e4b6d664b346f5a644657475264697347666875552f313248727a386a4e756d74384367594541703252574f786f39616c736532614279696b73410a724d47723775663632746461594865517462694173523853685744526169364c6f614f46427050696435374f6f4e4771347353787166646135587636764a32320a53375758746f4e70666c6f526753435a5135592f3478485a6d666e56513169615546524f787665394767373239772b4c55514c783747584c6232556a657969440a4e4737793466597668645957626a3461752b53755268343d0a2d2d2d2d2d454e442050524956415445204b45592d2d2d2d2d0a";

  const [mode, setMode] = useState('C');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'C' ? 'D' : 'C'));
  };

  const handleAction = async () => {
    try {
      let response;
      let data;
      const url = 'https://peer-to-peer-loan-service-production.up.railway.app/rsa';
      const requestBody = mode === 'C' ? { message, public_key } : { message, private_key };

      response = await fetch(`${url}/${mode === 'C' ? 'encrypt' : 'decrypt'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      data = await response.json();
      console.log(data.response);
      if (mode === 'C') {
        setResult(data.response.encrypted_message);
      } else {
        setResult(data.response.decrypted_message);
      }
    } catch (error) {
      console.error('Error during API request:', error);
      setResult('Error during API request');
    }
  };

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
              Gerencie suas chaves
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="p-[20px] h-full">
            <div>
              <div className="flex items-center mb-[20px]">
                <label className="mr-[10px]">Modo:</label>
                <button
                  onClick={toggleMode}
                  className="py-[5px] px-[10px] bg-[#4e73df] text-white rounded cursor-pointer"
                >
                  {mode === 'C' ? 'Criptografar' : 'Descriptografar'}
                </button>
              </div>
              <div className="mb-[20px]">
                <label>Mensagem:</label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="py-[5px] px-[10px] border rounded w-full max-w-[735px]"
                  placeholder="Digite sua mensagem"
                />
              </div>
              <div className="flex items-center justify-center mb-[20px]">
                <button
                  onClick={handleAction}
                  className="py-[5px] px-[50px] bg-[#4e73df] text-white rounded cursor-pointer"
                >
                  <PiKeyDuotone />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <p className="py-[5px] px-[10px] border rounded bg-[#F8F9FC] w-full break-words max-w-[735px]">
                  Resultado: {result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
