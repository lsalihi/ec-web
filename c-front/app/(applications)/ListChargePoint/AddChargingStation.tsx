"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from 'app/components/Home/Header';
import StepNavigation from './components/StepNavigation';
import StationInfoStep from './components/StationInfoStep';
import AddressInfoStep from './components/AddressInfoStep';
import ConnectorsStep from './components/ConnectorsStep';
import AvailabilityStep from './components/AvailabilityStep';
import ReviewStep from './components/ReviewStep';
import { validateStep } from './utils/validateStep';
import { addChargingStation } from './utils/api';

export default function AddChargingStation() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // ... initial form data
  });
  const [connectors, setConnectors] = useState([]);
  const [availability, setAvailability] = useState([]);

  const handleNext = () => {
    if (validateStep(step, formData, connectors, availability)) {
      setStep(step + 1);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(5, formData, connectors, availability)) {
      try {
        await addChargingStation(formData, connectors, availability);
        alert('Charging station added successfully!');
        router.push('/map');
      } catch (error) {
        console.error('Error adding charging station:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleSetCoordinates = async (coords: { lat: number; lng: number }) => {
    // ... implementation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCoordinates={handleSetCoordinates} />
      <div className="bg-indigo-900 py-6 px-4 sm:px-6 lg:px-8">
        {/* ... header content */}
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <StepNavigation currentStep={step} />

          <div className="bg-white rounded-lg shadow-lg w-full lg:w-3/4 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Information</h2>
            <form className="space-y-6">
              {step === 1 && <StationInfoStep formData={formData} setFormData={setFormData} />}
              {step === 2 && <AddressInfoStep formData={formData} setFormData={setFormData} />}
              {step === 3 && <ConnectorsStep connectors={connectors} setConnectors={setConnectors} />}
              {step === 4 && <AvailabilityStep availability={availability} setAvailability={setAvailability} />}
              {step === 5 && <ReviewStep formData={formData} connectors={connectors} availability={availability} onSubmit={handleSubmit} />}

              <div className="flex flex-col sm:flex-row justify-between">
                {step > 1 && (
                  <button type="button" onClick={handleBack} className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-3 sm:mb-0">
                    Back
                  </button>
                )}

                {step < 5 && (
                  <button type="button" onClick={handleNext} className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
