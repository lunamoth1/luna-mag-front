import axios from "axios";
import { API_URL } from "@/constants";
import type { Creator, EditCreator } from "@/types/api/creator";
import { useCreatorsStore } from "@/store/creatorsStore";

export async function uploadImageToStrapi(
	cloudinaryUrl: string,
	fileName?: string,
): Promise<number> {
	try {
		const uploadRes = await axios.post(`${API_URL}/api/upload-image`, {
			imageUrl: cloudinaryUrl,
			fileName: fileName || "image.jpg",
		});

		if (!uploadRes.data?.data?.id) {
			throw new Error("Ошибка загрузки: нет ID в ответе");
		}

		return uploadRes.data.data.id;
	} catch (error) {
		console.error("Ошибка при загрузке изображения в Strapi:", error);
		throw error;
	}
}

export async function uploadMultipleImagesToStrapi(
	cloudinaryUrls: string[],
): Promise<number[]> {
	try {
		const uploadPromises = cloudinaryUrls.map((url, index) =>
			uploadImageToStrapi(url, `work-${index}.jpg`),
		);

		return await Promise.all(uploadPromises);
	} catch (error) {
		console.error("Ошибка при загрузке множества изображений:", error);
		throw error;
	}
}

export async function fetchCreators(): Promise<Creator[]> {
	const { setCreators, setIsLoading } = useCreatorsStore.getState();

	try {
		setIsLoading(true);

		const res = await axios.get(
			`${API_URL}/api/creators?populate=*&pagination[pageSize]=1000`,
		);

		const data = res.data?.data || [];

		const formattedCreators = data.map((item: Creator) => ({
			id: item.id,
			documentId: item.documentId,
			instagram: item.instagram,
			photo: item.photo || null,
			worksPhotos: item.worksPhotos || [],
			based: item.based,
			style: item.style,
			hide: item.hide,
			createdAt: item.createdAt,
			updatedAt: item.updatedAt,
		}));

		setCreators(formattedCreators);

		return formattedCreators;
	} catch (error) {
		console.error("Ошибка при получении списка креаторов:", error);
		return [];
	} finally {
		setIsLoading(false);
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
