import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';

export const registerAndGetCredentials = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      companyName: 'Affordmed',
      ownerName: 'Md Shakir',
      rollNo: '00616407722',
      ownerEmail: 'abdulshakirsam@gmail.com',
      accessCode: 'mEAXRX' // Replace with the actual access code you received
    });

    const { clientID, clientSecret } = response.data;
    localStorage.setItem('clientID', clientID);
    localStorage.setItem('clientSecret', clientSecret);
    return { clientID, clientSecret };
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const getAuthToken = async (clientID, clientSecret) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
      companyName: 'Affordmed',
      clientID,
      clientSecret,
      ownerName: 'Md Shakir',
      ownerEmail: 'abdulshakirsam@gmail.com',
      rollNo: '00616407722'
    });

    const { token_type, access_token } = response.data;
    const authToken = `${token_type} ${access_token}`;
    localStorage.setItem('authToken', authToken);
    return authToken;
  } catch (error) {
    console.error('Error getting authorization token:', error);
    throw error;
  }
};

export const getProducts = async (company, category, top, minPrice, maxPrice) => {
  let authToken = localStorage.getItem('authToken');

  if (!authToken) {
    const clientID = localStorage.getItem('clientID');
    const clientSecret = localStorage.getItem('clientSecret');

    if (!clientID || !clientSecret) {
      const credentials = await registerAndGetCredentials();
      authToken = await getAuthToken(credentials.clientID, credentials.clientSecret);
    } else {
      authToken = await getAuthToken(clientID, clientSecret);
    }
  }

  const response = await axios.get(`${API_BASE_URL}/companies/${company}/categories/${category}/products`, {
    params: { top, minPrice, maxPrice },
    headers: {
      'Authorization': authToken
    }
  });

  return response.data;
};
