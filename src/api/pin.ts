import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL;

export async function verifyPin(pin: string): Promise<boolean> {
  try {
    const response = await axios.post(`${API_URL}/api/pin/verify`, { pin });
    return response.data.success === true;
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return false;
  }
}
