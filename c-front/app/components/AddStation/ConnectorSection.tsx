import React, { useState } from 'react';
import Modal from 'react-modal';

interface Connector {
    type: string;
    power: string;
    voltage: string;
    intensity: string;
    chargingSpeed: string;
    format: string;
}

interface ConnectorSectionProps {
    connectors: Connector[];
    setConnectors: React.Dispatch<React.SetStateAction<Connector[]>>;
}

const ConnectorSection: React.FC<ConnectorSectionProps> = ({ connectors, setConnectors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newConnector, setNewConnector] = useState<Connector>({
        type: '',
        power: '',
        voltage: '',
        intensity: '',
        chargingSpeed: '',
        format: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewConnector(prev => ({ ...prev, [name]: value }));
    };

    const addConnector = () => {
        if (newConnector.type && newConnector.power) {
            setConnectors(prev => [...prev, newConnector]);
            setNewConnector({
                type: '',
                power: '',
                voltage: '',
                intensity: '',
                chargingSpeed: '',
                format: ''
            });
            setIsModalOpen(false);
        }
    };

    const removeConnector = (index: number) => {
        setConnectors(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Add Connector
            </button>

            {connectors.map((connector, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                    <span>{connector.type} - {connector.power}kW</span>
                    <div>
                        <button className="text-blue-500 mr-2">Edit</button>
                        <button onClick={() => removeConnector(index)} className="text-red-500">Delete</button>
                    </div>
                </div>
            ))}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="bg-white p-6 rounded-lg max-w-md mx-auto mt-20"
            >
                <h2 className="text-xl font-bold mb-4">Add Connector</h2>
                <select
                    name="type"
                    value={newConnector.type}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                >
                    <option value="">Select Connector Type</option>
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="CCS">CCS</option>
                    <option value="CHAdeMO">CHAdeMO</option>
                </select>
                <input
                    type="text"
                    name="power"
                    value={newConnector.power}
                    onChange={handleInputChange}
                    placeholder="Power (kW)"
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    type="text"
                    name="voltage"
                    value={newConnector.voltage}
                    onChange={handleInputChange}
                    placeholder="Voltage"
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    type="text"
                    name="intensity"
                    value={newConnector.intensity}
                    onChange={handleInputChange}
                    placeholder="Intensity"
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    type="text"
                    name="chargingSpeed"
                    value={newConnector.chargingSpeed}
                    onChange={handleInputChange}
                    placeholder="Charging Speed"
                    className="w-full p-2 mb-2 border rounded"
                />
                <select
                    name="format"
                    value={newConnector.format}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border rounded"
                >
                    <option value="">Select Connector Format</option>
                    <option value="Socket">Socket</option>
                    <option value="Cable">Cable</option>
                </select>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={addConnector}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ConnectorSection;