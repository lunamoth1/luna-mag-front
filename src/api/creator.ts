import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL;

export interface Creator {
  id: number;
  documentId: string;
  name: string;
  Bio: string;
  Works?: any[];
}

export async function fetchCreators(): Promise<Creator[]> {
  try {
    const response = await axios.get(`${API_URL}/api/creators?populate=*`);

    const data = response.data?.data || [];

    return data.map((item: any) => ({
      id: item.id,
      documentId: item.documentId,
      name: item.name,
      Bio: item.Bio,
      Works: item.Works
    }));
  } catch (error) {
    console.error('Ошибка при получении списка креаторов:', error);
    return [];
  }
}

export async function addCreator(creatorData: { name: string; Bio: string }) {
  try {
    const payload = {
      data: creatorData
    };

    const response = await axios.post(`${API_URL}/api/creators`, payload);
    return response.data?.data;
  } catch (error) {
    console.error('Ошибка при добавлении креатора:', error);
    throw error;
  }
}

export async function updateCreator(documentId: string, creatorData: { name: string; Bio: string }) {
  try {
    const payload = {
      data: creatorData
    };

    const response = await axios.put(`${API_URL}/api/creators/${documentId}`, payload);
    return response.data?.data;
  } catch (error) {
    console.error('Ошибка при обновлении креатора:', error);
    throw error;
  }
}

export async function deleteCreator(documentId: string) {
  try {
    const response = await axios.delete(`${API_URL}/api/creators/${documentId}`);
    return response.data?.data;
  } catch (error) {
    console.error('Ошибка при удалении креатора:', error);
    throw error;
  }
}
