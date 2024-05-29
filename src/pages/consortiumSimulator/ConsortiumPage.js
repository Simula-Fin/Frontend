import React, { useState } from 'react';
import SelectionStep from './components/SelectionStep';
import CreditValueStep from './components/CreditValueStep';
import OffersStep from './components/OffersStep';

const ConsortiumSimulator = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [creditValue, setCreditValue] = useState(10000);
  const [offers, setOffers] = useState([]);

  const handleNext = () => {
    if (step === 1 && selectedOption) {
      setStep(2);
    } else if (step === 2 && creditValue) {
      // Simulate fetching offers
      const mockOffers = [
        { title: 'Parcela Reduzida 50%', value: creditValue, installment: 868.05, duration: 75 },
        { title: 'Parcela Reduzida 30%', value: creditValue, installment: 1147.97, duration: 75 },
        { title: 'Parcela Reduzida 20%', value: creditValue, installment: 1267.97, duration: 75 }
      ];
      setOffers(mockOffers);
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNewSimulation = () => {
    setStep(1);
    setSelectedOption('');
    setCreditValue(10000);
    setOffers([]);
  };

  return (
    <div className="p-4">
      {step === 1 && <SelectionStep selectedOption={selectedOption} setSelectedOption={setSelectedOption} handleNext={handleNext} />}
      {step === 2 && <CreditValueStep creditValue={creditValue} setCreditValue={setCreditValue} handleNext={handleNext} handleBack={handleBack} />}
      {step === 3 && <OffersStep offers={offers} handleNewSimulation={handleNewSimulation} />}
    </div>
  );
};

export default ConsortiumSimulator;
