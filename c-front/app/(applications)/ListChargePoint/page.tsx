"use client";
import Header from 'app/components/Home/Header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddChargingStation() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<File | null>(null);

  // State to track form data for each step
  const [formData, setFormData] = useState({
    name: '',
    type: 'AC', // Default to AC
    capacity: '',
    status: 'working', // Default to working
    street: '',
    streetNumber: '',
    complement: '',
    city: '',
    postalCode: '',
    coordinates: {
      lat: '',
      lng: ''
    }
  });

  // Validation function to check if fields are filled
  const validateStep = (step: any) => {
    switch (step) {
      case 1:
        return formData.name && formData.type && formData.capacity && formData.status;
      case 2:
        return formData.street && formData.streetNumber && formData.city && formData.postalCode && formData.coordinates.lat && formData.coordinates.lng;
      default:
        return false;
    }
  };

  // Handle form change
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle coordinate input
  const handleCoordinateChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      coordinates: { ...formData.coordinates, [name]: value }
    });
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  
  // Proceed to the next step
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      alert("Please fill in all required fields");
    }
  };

  // Go back to the previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(1) && validateStep(2)) {
      try {
        const response = await fetch('/api/charging-stations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            coordinates: {
              lat: parseFloat(formData.coordinates.lat),
              lng: parseFloat(formData.coordinates.lng),
            },
          }),
        });

        if (response.ok) {
          alert('Charging station added successfully!');
          router.push('/map'); // Redirect to the map page
        } else {
          alert('Failed to add charging station. Please try again.');
        }
      } catch (error) {
        console.error('Error adding charging station:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  // Sidebar steps
  const steps = [
    { id: 1, label: '1. User info' },
    { id: 2, label: '2. Address info' },
    { id: 3, label: '3. Review' },
    { id: 4, label: '4. Confirmation' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-indigo-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <button className="text-white flex items-center">
              Back to the map
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4">Add a charging station</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <ol className="space-y-4 w-full lg:w-72 mb-6 lg:mb-0">
            {steps.map((s) => (
              <li key={s.id}>
                <div
                  className={`w-full p-4 border rounded-lg ${step === s.id ? 'text-blue-700 bg-blue-100 border-blue-300' :
                      validateStep(s.id) ? 'text-green-700 bg-green-50 border-green-300' :
                        'text-gray-900 bg-gray-100 border-gray-300'
                    }`}
                  role="alert"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{s.label}</h3>
                    {validateStep(s.id) && (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                      </svg>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="bg-white rounded-lg shadow-lg w-full lg:w-3/4 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Information</h2>
            <form className="space-y-6">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Charging station name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Charging station type *</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value="AC"
                          checked={formData.type === 'AC'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-indigo-600"
                        />
                        <span className="ml-2">AC</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value="DC"
                          checked={formData.type === 'DC'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-indigo-600"
                        />
                        <span className="ml-2">DC</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Capacity (total connectors) *</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Charging station status *</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="working"
                          checked={formData.status === 'working'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-indigo-600"
                        />
                        <span className="ml-2">Working</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="not working"
                          checked={formData.status === 'not working'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-indigo-600"
                        />
                        <span className="ml-2">Not Working</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Number *</label>
                    <input
                      type="text"
                      name="streetNumber"
                      value={formData.streetNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Complement Address</label>
                    <input
                      type="text"
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Latitude *</label>
                    <input
                      type="text"
                      name="lat"
                      value={formData.coordinates.lat}
                      onChange={handleCoordinateChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Longitude *</label>
                    <input
                      type="text"
                      name="lng"
                      value={formData.coordinates.lng}
                      onChange={handleCoordinateChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Review your information</h3>
                  {/* Display a summary of the entered information */}
                  <div className="space-y-4">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Type:</strong> {formData.type}</p>
                    <p><strong>Capacity:</strong> {formData.capacity}</p>
                    <p><strong>Status:</strong> {formData.status}</p>
                    <p><strong>Address:</strong> {formData.streetNumber} {formData.street}, {formData.city}, {formData.postalCode}</p>
                    <p><strong>Coordinates:</strong> {formData.coordinates.lat}, {formData.coordinates.lng}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-6 bg-green-600 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                </>
              )}

              <div className="flex flex-col sm:flex-row justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-3 sm:mb-0"
                  >
                    Back
                  </button>
                )}

                {step < 3 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
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
