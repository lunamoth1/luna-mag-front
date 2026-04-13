import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL;

export async function fetchMarquee() {
    try {
        const response = await axios.get(`${API_URL}/api/marquee?populate=items`);

        const items = response.data.data.items;
        const textStrings = items.map((item: { id: number; text: string }) => item.text);

        return textStrings;

    } catch (error) {
        console.error('Ошибка при получении бегущей строки из Strapi:', error);
        return [];
    }
}

export async function updateMarquee(texts: string[]) {
    try {
        const payload = {
            data: {
                items: texts.map(text => ({ text }))
            }
        };

        const response = await axios.put(`${API_URL}/api/marquee?populate=items`, payload);

        const items = response.data.data.items || [];
        return items.map((item: { id: number; text: string }) => item.text);

    } catch (error) {
        console.error('Ошибка при обновлении бегущей строки в Strapi:', error);
        throw error;
    }
}
