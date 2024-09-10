import axios from 'axios';
import nookies from 'nookies';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const fetchUserData = async (setUserData: Function, setError: Function, setLoading: Function) => {
  const cookies = nookies.get(null, "access_token");
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    setError("No access token found");
    console.log("No access token found");
    setLoading(false);
    return;
  }

  const decodedToken = parseJwt(accessToken);
  const userId = decodedToken.user_id || decodedToken.sub;
  console.log("User ID:", userId);

  try {
    const userResponse = await axios.get(`${API_URL}/KEYCLOAK-AUTH-SERVICE/keycloak/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("userResponse hh", userResponse.data.username);
    setUserData(userResponse.data.username);
    // console.log("userData hh", userData);
    
    // dispatch(setUserData(userResponse.data)); // Dispatch the user data to the store
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};