import axios from "axios";
import { API_URL } from "@/constants";
import type { Gallery, EditGallery } from "@/types/api/galleries";

export async function fetchGalleries(): Promise<Gallery[]> {
	try {
		const res = await axios.get(
			`${API_URL}/api/galleries?populate=*&pagination[pageSize]=1000`,
		);

		const data = res.data?.data || [];

		return data.map((item: Gallery) => ({
			id: item.id,
			documentId: item.documentId,
			image: item.image,
			link: item.link,
			createdAt: item.createdAt,
			updatedAt: item.updatedAt,
		}));
	} catch (error) {
		console.error("Ошибка при получении галереи:", error);
		return [];
	}
}

export async function addGallery(galleryData: EditGallery) {
	try {
		const payload = { data: galleryData };

		const res = await axios.post(`${API_URL}/api/galleries`, payload);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при добавлении в галерею:", error);
		throw error;
	}
}

export async function updateGallery(
	documentId: string,
	galleryData: EditGallery,
) {
	try {
		const payload = { data: galleryData };

		const res = await axios.put(
			`${API_URL}/api/galleries/${documentId}`,
			payload,
		);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при обновлении галереи:", error);
		throw error;
	}
}

export async function deleteGallery(documentId: string) {
	try {
		const res = await axios.delete(`${API_URL}/api/galleries/${documentId}`);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при удалении из галереи:", error);
		throw error;
	}
}
