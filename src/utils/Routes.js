import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TestPage from '../pages/dash/teste';
import LoanSimulatorPage from '../pages/loanSimulator/loanPage';
import LoginPage from '../pages/login/App';
import ConsortiumPage from '../pages/consortiumSimulator/ConsortiumPage';
import FinancingPage from '../pages/financingSimulator/financingPage';
import MainLayout from '../utils/MainLayout';

const EmptyPage = () => <div className="p-6">Bem-vindo ao Simula-Fin. Use a barra lateral para navegar.</div>;

const MyRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<EmptyPage />} />
          <Route path="/teste" element={<TestPage />} />
          <Route path="/loan-simulator" element={<LoanSimulatorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/consortium" element={<ConsortiumPage />} />
          <Route path="/financing" element={<FinancingPage />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default MyRoutes;
