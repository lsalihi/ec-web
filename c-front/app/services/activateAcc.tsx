import axios from 'axios';
import nookies from 'nookies';



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const activateAccount = async (activationKey: string) => {
    if (!activationKey) {
        throw new Error('Activation key is required');
    }

    const cookies = nookies.get(null);
    const accessToken = cookies.accessToken;

    if (!accessToken) {
        throw new Error('Access token is missing');
    }

    const response = await axios.post(
        `${API_URL}/KEYCLOAK-AUTH-SERVICE/account/activate`,
        { activationKey },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};