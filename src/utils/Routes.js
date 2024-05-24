import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TestPage from '../pages/dash/teste';
import LoanSimulatorPage from '../pages/loanSimulator/loanPage';
import LoginPage from '../pages/login/App';
import ConsortiumPage from '../pages/consortiumSimulator/ConsortiumPage';
import FinancingPage from '../pages/financingSimulator/financingPage';
import Sidebar from '../pages/components/Sidebar';

const EmptyPage = () => <div className="p-6">Bem-vindo ao Simula-Fin. Use a barra lateral para navegar.</div>;

const MyRoutes = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<EmptyPage />} />
            <Route path="/teste" element={<TestPage />} />
            <Route path="/loan-simulator" element={<LoanSimulatorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/consortium" element={<ConsortiumPage />} />
            <Route path="/financing" element={<FinancingPage />} />
            {/* Adicione outras rotas aqui */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default MyRoutes;
