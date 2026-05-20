import axios from "axios";
import { API_URL } from "@/constants";
import type { Partner, EditPartner } from "@/types/api/partner";

export async function fetchPartners(): Promise<Partner[]> {
	try {
		const res = await axios.get(
			`${API_URL}/api/partners?populate=*&pagination[pageSize]=1000`,
		);

		const data = res.data?.data || [];

		return data.map((item: Partner) => ({
			id: item.id,
			documentId: item.documentId,
			name: item.name,
			createdAt: item.createdAt,
			updatedAt: item.updatedAt,
		}));
	} catch (error) {
		console.error("Ошибка при получении списка партнеров:", error);
		return [];
	}
}

export async function addPartner(partnerData: EditPartner) {
	try {
		const payload = { data: partnerData };

		const res = await axios.post(`${API_URL}/api/partners`, payload);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при добавлении партнера:", error);
		throw error;
	}
}

export async function updatePartner(
	documentId: string,
	partnerData: EditPartner,
) {
	try {
		const payload = { data: partnerData };

		const res = await axios.put(`${API_URL}/api/partners/${documentId}`, payload);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при обновлении партнера:", error);
		throw error;
	}
}

export async function deletePartner(documentId: string) {
	try {
		const res = await axios.delete(`${API_URL}/api/partners/${documentId}`);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при удалении партнера:", error);
		throw error;
	}
}
