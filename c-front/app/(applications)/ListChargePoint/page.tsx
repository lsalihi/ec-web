"use client";
import Header from 'app/components/Home/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConnectorSection from 'app/components/AddStation/ConnectorSection';
import DatePicker from 'react-datepicker'; // You'll need to install this package
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal'; // You'll need to install this package

export default function AddChargingStation() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<File | null>(null);
  const [connectors, setConnectors] = useState<Array<{ type: string; power: string }>>([]);
  const [availability, setAvailability] = useState<Array<{
    day: string;
    startDate: Date;
    endDate: Date;
  }>>([]);

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
  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_KEY;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConnector, setNewConnector] = useState({
    type: '',
    power: '',
    voltage: '',
    intensity: '',
    chargingSpeed: '',
    format: ''
  });

  // Add this state to keep track of which connector is being edited
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.type && formData.capacity && formData.status;
      case 2:
        return formData.street && formData.streetNumber && formData.city && formData.postalCode && formData.coordinates.lat && formData.coordinates.lng;
      case 3:
        return connectors.length > 0;
      case 4:
        return availability.length > 0 && availability.every(item => 
          item.day && item.startDate && item.endDate && item.startDate < item.endDate
        );
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
      if (step < 5) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    } else {
      switch (step) {
        case 1:
          alert("Please fill in all required station info fields");
          break;
        case 2:
          alert("Please fill in all required address info fields");
          break;
        case 3:
          alert("Please add at least one connector");
          break;
        case 4:
          alert("Please add at least one availability entry");
          break;
        default:
          alert("Please fill in all required fields");
      }
    }
  };

  // Go back to the previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all steps
    for (let i = 1; i <= 4; i++) {
      if (!validateStep(i)) {
        alert(`Please fill in all required fields for step ${i}`);
        return;
      }
    }

    try {
      const response = await fetch('/api/charging-stations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          connectors,
          availability
        }),
      });

      if (response.ok) {
        // Redirect to the map page with the new station's coordinates
        router.push(`/map?lat=${formData.coordinates.lat}&lng=${formData.coordinates.lng}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  // Sidebar steps
  const steps = [
    { id: 1, label: '1. Station info' },
    { id: 2, label: '2. Address info' },
    { id: 3, label: '3. Connectors' },
    { id: 4, label: '4. Availability' },
    { id: 5, label: '5. Review' }
  ];
  const handleSetCoordinates = async (coords: { lat: number; lng: number }) => {
    setFormData(prev => ({
      ...prev,
      coordinates: {
        lat: coords.lat.toString(),
        lng: coords.lng.toString()
      }
    }));

    // Fetch address details using reverse geocoding
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const address = data.features[0];
        const streetAddress = address.place_name.split(',')[0];
        const [street, streetNumber] = streetAddress.split(' ').reverse();

        setFormData(prev => ({
          ...prev,
          street: street || prev.street,
          streetNumber: streetNumber || prev.streetNumber,
          city: address.context.find((c: any) => c.id.startsWith('place'))?.text || prev.city,
          postalCode: address.context.find((c: any) => c.id.startsWith('postcode'))?.text || prev.postalCode,
        }));
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
    }
  };

  const handleAddAvailability = () => {
    setAvailability([...availability, {
      day: 'MONDAY', // Default to Monday
      startDate: new Date(),
      endDate: new Date(),
    }]);
  };

  const handleRemoveAvailability = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const handleAvailabilityChange = (index: number, field: string, value: Date | null) => {
    const newAvailability = [...availability];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setAvailability(newAvailability);
  };

  // Modify handleAddConnector to reset editingIndex
  const handleAddConnector = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditingIndex(null);
    setNewConnector({
      type: '',
      power: '',
      voltage: '',
      intensity: '',
      chargingSpeed: '',
      format: ''
    });
    setIsModalOpen(true);
  };

  // Add this function to handle editing a connector
  const handleEditConnector = (index: number) => {
    setEditingIndex(index);
    setNewConnector(connectors[index]);
    setIsModalOpen(true);
  };

  // Modify handleSaveConnector to handle both adding and editing
  const handleSaveConnector = () => {
    if (editingIndex !== null) {
      // Editing an existing connector
      const updatedConnectors = [...connectors];
      updatedConnectors[editingIndex] = newConnector;
      setConnectors(updatedConnectors);
    } else {
      // Adding a new connector
      setConnectors([...connectors, newConnector]);
    }
    setIsModalOpen(false);
    setNewConnector({
      type: '',
      power: '',
      voltage: '',
      intensity: '',
      chargingSpeed: '',
      format: ''
    });
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCoordinates={handleSetCoordinates} />
      <div className="bg-indigo-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <button className="text-white flex items-center">
              Back to the map
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4">Add a charging station</h1>
          {/* Your existing form fields */}
          {/* ... */}

          {/* Add the ConnectorSection component here */}

          {/* Add any additional form fields or submit button */}
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
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  <h3 className="text-lg font-semibold mb-4">Connectors</h3>
                  <button
                    onClick={handleAddConnector}
                    className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                    type="button"
                  >
                    Add Connector
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {connectors.map((connector, index) => (
                      <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{connector.type}</h4>
                        <p>Power: {connector.power} kW</p>
                        <p>Voltage: {connector.voltage} V</p>
                        <p>Intensity: {connector.intensity} A</p>
                        <p>Charging Speed: {connector.chargingSpeed}</p>
                        <p>Format: {connector.format}</p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditConnector(index);
                          }}
                          className="mt-2 bg-blue-500 text-white py-1 px-2 rounded text-sm"
                          type="button"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="bg-white p-6 rounded-lg max-w-md mx-auto mt-20"
                  >
                    <h2 className="text-xl font-bold mb-4">Add Connector</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Connector Type</label>
                        <select
                          value={newConnector.type}
                          onChange={(e) => setNewConnector({...newConnector, type: e.target.value})}
                          className="mt-1 block w-full p-2 border rounded"
                        >
                          <option value="">Select Type</option>
                          <option value="Type 1">Type 1</option>
                          <option value="Type 2">Type 2</option>
                          <option value="CCS">CCS</option>
                          <option value="CHAdeMO">CHAdeMO</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Power (kW)</label>
                        <input
                          type="number"
                          value={newConnector.power}
                          onChange={(e) => setNewConnector({...newConnector, power: e.target.value})}
                          className="mt-1 block w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Voltage</label>
                        <input
                          type="number"
                          value={newConnector.voltage}
                          onChange={(e) => setNewConnector({...newConnector, voltage: e.target.value})}
                          className="mt-1 block w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Intensity</label>
                        <input
                          type="number"
                          value={newConnector.intensity}
                          onChange={(e) => setNewConnector({...newConnector, intensity: e.target.value})}
                          className="mt-1 block w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Charging Speed</label>
                        <input
                          type="text"
                          value={newConnector.chargingSpeed}
                          onChange={(e) => setNewConnector({...newConnector, chargingSpeed: e.target.value})}
                          className="mt-1 block w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Connector Format</label>
                        <select
                          value={newConnector.format}
                          onChange={(e) => setNewConnector({...newConnector, format: e.target.value})}
                          className="mt-1 block w-full p-2 border rounded"
                        >
                          <option value="">Select Format</option>
                          <option value="Socket">Socket</option>
                          <option value="Cable">Cable</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveConnector}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </Modal>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Availability</h3>
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={handleAddAvailability}
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Add Availability
                    </button>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left">Jour</th>
                            <th className="px-4 py-2 text-left">Date de début</th>
                            <th className="px-4 py-2 text-left">Date de fin</th>
                            <th className="px-4 py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {availability.map((item, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2">
                                <select
                                  value={item.day}
                                  onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                                  className="p-2 border rounded"
                                >
                                  {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => (
                                    <option key={day} value={day}>{day}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 py-2">
                                <DatePicker
                                  selected={item.startDate}
                                  onChange={(date: Date | null) => handleAvailabilityChange(index, 'startDate', date)}
                                  showTimeSelect
                                  dateFormat="yyyy-MM-dd HH:mm"
                                  className="p-2 border rounded"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <DatePicker
                                  selected={item.endDate}
                                  onChange={(date: Date | null) => handleAvailabilityChange(index, 'endDate', date)}
                                  showTimeSelect
                                  dateFormat="yyyy-MM-dd HH:mm"
                                  className="p-2 border rounded"
                                />
                              </td>
                              <td className="px-4 py-2">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveAvailability(index)}
                                  className="text-red-500"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Review your information</h3>
                  <div className="space-y-4">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Type:</strong> {formData.type}</p>
                    <p><strong>Capacity:</strong> {formData.capacity}</p>
                    <p><strong>Status:</strong> {formData.status}</p>
                    <p><strong>Address:</strong> {formData.streetNumber} {formData.street}, {formData.city}, {formData.postalCode}</p>
                    <p><strong>Coordinates:</strong> {formData.coordinates.lat}, {formData.coordinates.lng}</p>
                    <h4 className="font-semibold">Connectors:</h4>
                    {connectors.map((connector, index) => (
                      <div key={index} className="ml-4">
                        <p>Type: {connector.type}, Power: {connector.power}</p>
                      </div>
                    ))}
                    <h4 className="font-semibold mt-4">Availability:</h4>
                    <ul className="list-disc list-inside ml-4">
                      {availability.map((item, index) => (
                        <li key={index}>
                          {item.day}: {item.startDate.toLocaleString()} - {item.endDate.toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Back
                </button>
                {step === 5 ? (
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
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