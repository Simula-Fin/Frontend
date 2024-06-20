import { jsPDF } from 'jspdf';
import logo from '../assets/logoBank.jpg';

const createMockContract = (investment) => {
    const contract = {
        contract_id: Math.floor(Math.random() * 100000),
        loan_id: investment.loan.loan_id,
        investor_id: investment.investor_user.user_id,
        borrower_id: investment.borrower_user.user_id,
        status: "active",
        date_signed: new Date(
            investment.date_signed
          ).toLocaleDateString(),
        investor_signature_digital_uuid: investment.investor_signature_digital_uuid,
        borrower_signature_digital_uuid: investment.borrower_signature_digital_uuid,
        investor_name: investment.investor_user.name,
        investor_cpf: investment.investor_user.cpf,
        investor_rg: "12.345.678-9",
        investor_nationality: "Brasileiro",
        investor_profession: "Engenheiro",
        investor_address: "Rua Exemplo, 123, São Paulo, SP",
        borrower_name: investment.borrower_user.name,
        borrower_cpf: investment.borrower_user.cpf,
        borrower_rg: "98.765.432-1",
        borrower_nationality: "Brasileiro",
        borrower_profession: "Professor",
        borrower_address: "Rua Fictícia, 456, Rio de Janeiro, RJ",
        amount: investment.loan.amount,
        interestRate: investment.loan.interest_rate,
        duration: investment.loan.duration
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

export { createMockContract, generatePDF };
