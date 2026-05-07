import axios from "axios";
import { API_URL } from "@/constants";
import type { Creator, EditCreator } from "@/types/api/creator";

export async function fetchCreators(): Promise<Creator[]> {
	try {
		const res = await axios.get(
			`${API_URL}/api/creators?populate=*&filters[hide][$eq]=false&pagination[pageSize]=1000`,
		);

		const data = res.data?.data || [];

		// Логируем структуру для отладки
		if (data.length > 0) {
			console.log("Creator data sample:", JSON.stringify(data[0], null, 2));
		}

		return data.map((item: Creator) => ({
			id: item.id,
			documentId: item.documentId,
			instagram: item.instagram,
			photo: item.photo,
			worksPhotos: item.worksPhotos,
			based: item.based,
			style: item.style,
		}));
	} catch (error) {
		console.error("Ошибка при получении списка креаторов:", error);
		return [];
	}
}

export async function addCreator(creatorData: EditCreator) {
	try {
		const payload = { data: creatorData };

		const res = await axios.post(`${API_URL}/api/creators`, payload);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при добавлении креатора:", error);
		throw error;
	}
}

export async function updateCreator(
	documentId: string,
	creatorData: EditCreator,
) {
	try {
		const payload = { data: creatorData };

		const res = await axios.put(
			`${API_URL}/api/creators/${documentId}`,
			payload,
		);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при обновлении креатора:", error);
		throw error;
	}
}

export async function deleteCreator(documentId: string) {
	try {
		const res = await axios.delete(`${API_URL}/api/creators/${documentId}`);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при удалении креатора:", error);
		throw error;
	}
}
