import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TestPage from '../pages/dash/teste';
import LoanSimulatorPage from '../pages/loanSimulator/loanPage';
import LoginPage from '../pages/login';
import ConsortiumPage from '../pages/consortiumSimulator/ConsortiumPage';
import FinancingPage from '../pages/financingSimulator/financingPage';
import LoanRequestPage from '../pages/loanRequest/loanRequestPage';
import MainLayout from '../utils/MainLayout';
import { useAuth } from './AuthContext'; // Importe o hook useAuth
import Register from '../pages/register';
import Profile from '../pages/profile';
import HomePage from '../pages/home/homePage';

const Private = ({ Item }) => {
  const { isAuthenticated } = useAuth();

  console.log("Main", isAuthenticated)

  return isAuthenticated ? <Item /> : <Navigate to="/login"/>;
};

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Private Item={HomePage} />} />
                <Route path="/teste" element={<Private Item={TestPage} />} />
                <Route path="/loan-simulator" element={<Private Item={LoanSimulatorPage} />} />
                <Route path="/consortium" element={<Private Item={ConsortiumPage} />} />
                <Route path="/financing" element={<Private Item={FinancingPage} />} />
                <Route path="/loan-request" element={<Private Item={LoanRequestPage} />} />
                <Route path="/profile" element={<Private Item={Profile} />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
