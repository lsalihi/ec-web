"use client";
import React, { useState } from 'react';
import { activateAccount } from 'app/services/activateAcc';

const ActivateAccPage: React.FC = () => {
    const [activationKey, setActivationKey] = useState('');

    const handleActivation = async () => {
        try {
            const result = await activateAccount(activationKey);
            console.log('Activation successful:', result);
            window.location.href = '/';
        } catch (error) {
            console.error('Activation failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Activate Your Account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="activation-key" className="block text-sm font-medium text-gray-700">
                                Activation Key
                            </label>
                            <div className="mt-1">
                                <input
                                    id="activation-key"
                                    name="activation-key"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={activationKey}
                                    onChange={(e) => setActivationKey(e.target.value)}
                                    placeholder="Enter activation key"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleActivation}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivateAccPage;