import axios from 'axios';
import nookies from 'nookies';

interface User {
  username: string;
  password: string;
  email: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (user: User) => {
  try {
    const response = await axios.post(`${API_URL}/KEYCLOAK-AUTH-SERVICE/keycloak/register`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
    });

    console.log("this is the response", response.data.token.accessToken);
    nookies.set(undefined, 'accessToken', response.data.token.accessToken, { path: '/' });
    nookies.set(undefined, 'refreshToken', response.data.token.refreshToken, { path: '/' });
    alert('Registration successful');
    window.location.href = 'ActivateAcc';
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || 'Registration failed';

      if (status === 409) {
        throw new Error('Email already exists');
      } else {
        throw new Error(errorMessage);
      }
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};


