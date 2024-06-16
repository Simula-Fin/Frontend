import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import perfil2 from '../../../assets/img2.png'; 
import perfil3 from '../../../assets/senhora.png';
import perfil4 from '../../../assets/mulher3.png';
import perfil5 from '../../../assets/images4.png'; 
import logo from '../../../assets/logoBank.jpg'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Graphics from "../../../pages/components/Graphics";
import Chart from "../../../pages/components/Chart";
import logo from '../../../assets/logoBank.jpg';

const LoanOpportunities = () => {
    const navigate = useNavigate();

    const opportunities = [
        { name: 'Alex', duration: 20, amount: 'R$5000', interestRate: '12%', risk: 'baixo', picture: perfil5, loan_id: 1, borrower_id: 1 },
        { name: 'Jorge', duration: 30, amount: 'R$2000', interestRate: '14%', risk: 'alto', picture: perfil2, loan_id: 2, borrower_id: 2 },
        { name: 'Rebeca', duration: 40, amount: 'R$9000', interestRate: '22%', risk: 'baixo', picture: perfil3, loan_id: 3, borrower_id: 3 },
        { name: 'Cassiana', duration: 50, amount: 'R$7000', interestRate: '72%', risk: 'médio', picture: perfil4, loan_id: 4, borrower_id: 4 },
        { name: 'Eduardo', duration: 60, amount: 'R$2000', interestRate: '47%', risk: 'baixo', picture: perfil5, loan_id: 5, borrower_id: 5 },
    ];

    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'baixo':
                return 'text-green-500';
            case 'médio':
                return 'text-yellow-500';
            case 'alto':
                return 'text-red-500';
            default:
                return '';
        }
    };

    const confirmInvestmentToast = () => {
        toast.success('Seu investimento passará por análise. Observe o andamento na tela de "meus investimentos".');
        closeModal();
    };

    const handleRowClick = (opportunity) => {
        setSelectedOpportunity(opportunity);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOpportunity(null);
    };

    const createMockContract = () => {
        const contract = {
            contract_id: Math.floor(Math.random() * 100000),
            loan_id: selectedOpportunity.loan_id,
            investor_id: 1, // Mock investor ID
            borrower_id: selectedOpportunity.borrower_id,
            status: "active",
            date_signed: new Date().toISOString(),
            investor_signature_digital_uuid: "mock-uuid-investor",
            borrower_signature_digital_uuid: "mock-uuid-borrower",
            investor_name: "John Doe",
            investor_cpf: "123.456.789-00",
            investor_rg: "12.345.678-9",
            investor_nationality: "Brasileiro",
            investor_profession: "Engenheiro",
            investor_address: "Rua Exemplo, 123, São Paulo, SP",
            borrower_name: selectedOpportunity.name,
            borrower_cpf: "987.654.321-00",
            borrower_rg: "98.765.432-1",
            borrower_nationality: "Brasileiro",
            borrower_profession: "Professor",
            borrower_address: "Rua Fictícia, 456, Rio de Janeiro, RJ",
            amount: selectedOpportunity.amount,
            interestRate: selectedOpportunity.interestRate,
            duration: selectedOpportunity.duration
        };
        return contract;
    };

    const generatePDF = (contract) => {
        const doc = new jsPDF();
        let y = 20;

        const addText = (text, fontSize = 10) => {
            doc.setFontSize(fontSize);
            const maxLineWidth = 180;
            const lines = doc.splitTextToSize(text, maxLineWidth);
            lines.forEach(line => {
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(line, 20, y);
                y += 10;
            });
        };

        // Add logo and company name
        doc.addImage(logo, 'JPEG', 10, 10, 20, 20);
        doc.setFontSize(16);
        doc.text("Simula-Fin", 35, 25);

        y = 40; // Adjust starting y position after header

        // Add contract title
        doc.setFontSize(12);
        doc.text("CONTRATO PARTICULAR DE EMPRÉSTIMO DE DINHEIRO", 20, y);
        y += 20;

        // Add contract details
        addText("Entre:", 12);
        addText(`${contract.investor_name}, solteiro, nacionalidade: ${contract.investor_nationality}, profissão: ${contract.investor_profession},`);
        addText(`carteira de identidade (RG) n.º ${contract.investor_rg}, expedida por SSP/SP,`);
        addText(`CPF n.º ${contract.investor_cpf}, residente em: ${contract.investor_address},`);
        addText("doravante denominado CREDOR,");

        addText("e:", 12);
        addText(`${contract.borrower_name}, solteiro, nacionalidade: ${contract.borrower_nationality}, profissão: ${contract.borrower_profession},`);
        addText(`carteira de identidade (RG) n.º ${contract.borrower_rg}, expedida por SSP/RJ,`);
        addText(`CPF n.º ${contract.borrower_cpf}, residente em: ${contract.borrower_address},`);
        addText("doravante denominado DEVEDOR,");

        addText("As partes acima identificadas têm, entre si, justo e acertado o presente contrato");
        addText("de empréstimo de dinheiro, que se regerá pela Lei Federal n. 10.406 e nas");
        addText("cláusulas e condições abaixo descritas.");

        addText("CLÁUSULA 1ª - DO OBJETO", 12);
        addText(`Por meio deste contrato, o CREDOR empresta ao DEVEDOR, direta e pessoalmente, a quantia de ${contract.amount} mediante as condições definidas neste contrato.`);
        addText("Parágrafo único. A quantia será entregue, ao DEVEDOR, em dinheiro, na data de ______________________.");

        addText("CLÁUSULA 2ª - DO PAGAMENTO", 12);
        addText("O DEVEDOR se obriga a restituir o valor tomado em empréstimo na seguinte forma:");
        addText(`Parcelas mensais no valor de ____________, com taxa de juros de ${contract.interestRate} ao mês, pelo prazo de ${contract.duration} meses.`);

        addText("CLÁUSULA 3ª - DAS OBRIGAÇÕES DO CREDOR", 12);
        addText("O CREDOR se obriga a entregar o valor estipulado na CLÁUSULA 1ª ao DEVEDOR no prazo acordado.");

        addText("CLÁUSULA 4ª - DAS OBRIGAÇÕES DO DEVEDOR", 12);
        addText("O DEVEDOR se obriga a pagar as parcelas estipuladas na CLÁUSULA 2ª nos prazos acordados.");

        addText("CLÁUSULA 5ª - DAS PENALIDADES", 12);
        addText("Em caso de inadimplemento, o DEVEDOR estará sujeito às penalidades previstas na legislação vigente.");

        addText("CLÁUSULA 6ª - DA RESCISÃO", 12);
        addText("Este contrato poderá ser rescindido por qualquer das partes, mediante aviso prévio por escrito, com antecedência mínima de 30 dias.");

        addText("CLÁUSULA 7ª - DO FORO", 12);
        addText("Fica eleito o foro da comarca de _______________ para dirimir quaisquer controvérsias oriundas deste contrato.");

        addText("Assinaturas:", 12);

        addText("_________________________________________", 10);
        addText("CREDOR");

        addText("_________________________________________", 10);
        addText("DEVEDOR");

        doc.save(`Contrato_${contract.contract_id}.pdf`);
    };

    const confirmInvestment = async () => {
        try {
            const contract = createMockContract();
            console.log("Mock contract created:", contract);
            generatePDF(contract);
            closeModal();
            navigate('/payment', { state: { contract } });
        } catch (error) {
            alert('Erro ao confirmar o investimento. Por favor, tente novamente.');
        }
    };

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
                            <th className="py-2 px-4 border-b text-left">Nome</                            th>
                            <th className="py-2 px-4 border-b text-center">Duração (Meses)</th>
                            <th className="py-2 px-4 border-b text-center">Valor</th>
                            <th className="py-2 px-4 border-b text-center">Taxa de Juros</th>
                            <th className="py-2 px-4 border-b text-center">Risco</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opportunities.map((opportunity, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(opportunity)}
                                className="hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                            >
                                <td className="py-2 px-4 border-b flex items-center">
                                    <img src={opportunity.picture} alt={opportunity.name} className="h-10 w-10 mr-2 rounded-full" />
                                    {opportunity.name}
                                </td>
                                <td className="py-2 px-4 border-b text-center">{opportunity.duration}</td>
                                <td className="py-2 px-4 border-b text-center">{opportunity.amount}</td>
                                <td className="py-2 px-4 border-b text-center">{opportunity.interestRate}</td>
                                <td className={`py-2 px-4 border-b text-center ${getRiskColor(opportunity.risk)}`}>
                                    {opportunity.risk.charAt(0).toUpperCase() + opportunity.risk.slice(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmação de Investimento</h2>
                        <p>Tem certeza que deseja investir em {selectedOpportunity.name}? Um contrato será gerado com mais informações.</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmInvestmentToast}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
            
            <Chart />
        </div>
    );
};

export default LoanOpportunities;
