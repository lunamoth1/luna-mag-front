import axios from "axios";
import { API_URL } from "@/constants";
import type { MarqueeItem } from "../types/api/marquee";

export async function fetchMarquee(): Promise<MarqueeItem[]> {
	try {
		const res = await axios.get(`${API_URL}/api/marquee?populate=items`);

		const items: MarqueeItem[] = res.data?.data?.items || [];

		return Array.isArray(items) ? items : [];
	} catch (error) {
		console.error("Ошибка при получении бегущей строки из Strapi:", error);
		return [];
	}
}

export async function updateMarquee(texts: string[]): Promise<string[]> {
	try {
		const payload = { data: { items: texts.map((text) => ({ text })) } };
		const response = await axios.put(
			`${API_URL}/api/marquee?populate=items`,
			payload,
		);
		const items: MarqueeItem[] = response.data.data.items || [];

		return items.map((item) => item.text);
	} catch (error) {
		console.error("Ошибка при обновлении бегущей строки в Strapi:", error);
		throw error;
	}
}
