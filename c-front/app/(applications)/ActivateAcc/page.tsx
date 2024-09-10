"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import nookies from 'nookies'
import { access } from 'fs';
import { activateAccount } from 'app/services/activateAcc';

const ActivateAccPage: React.FC = () => {
    const [activationKey, setActivationKey] = useState('');
    // const [accessToken, setAccessToken] = useState<string | null>(null);

    // useEffect(() => {
    //     const storedAccessToken = localStorage.getItem('accessToken');
    //     if (storedAccessToken) {
    //         setAccessToken(storedAccessToken);
    //     }
    // }, []);

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
        <div>
            <h1>Activate Account</h1>
            <input
                type="text"
                value={activationKey}
                onChange={(e) => setActivationKey(e.target.value)}
                placeholder="Enter activation key"
            />
            <button onClick={handleActivation}>Activate</button>
        </div>
    );
};

export default ActivateAccPage;