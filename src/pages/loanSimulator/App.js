import React from 'react';
import Sidebar from './components/Sidebar';
import LoanSimulator from './components/LoanSimulator';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <LoanSimulator />
      </div>
    </div>
  );
}

export default App;
