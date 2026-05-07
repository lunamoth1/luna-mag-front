import axios from "axios";
import { API_URL } from "@/constants";
import type { EditNewsItem, NewsItem } from "@/types/api/news";

export async function fetchNews(): Promise<NewsItem[]> {
	try {
		const res = await axios.get(`${API_URL}/api/tidings`);
		const items = Array.isArray(res.data?.data) ? res.data.data : [];

		return items
			.map((item: NewsItem) => ({
				id: item.id,
				documentId: item.documentId,
				title: item.title,
				text: item.text,
				featured: item.featured,
				order: item.order,
				createdAt: item.createdAt,
			}))
			.sort((a: NewsItem, b: NewsItem) => {
				if (a.featured && b.featured) {
					return (a.order || 0) - (b.order || 0);
				}
				if (a.featured) return -1;
				if (b.featured) return 1;
				return (
					new Date(b.createdAt || 0).getTime() -
					new Date(a.createdAt || 0).getTime()
				);
			});
	} catch (error) {
		console.error("Ошибка при получении новостей:", error);
		throw error;
	}
}

export async function addNews(newsData: EditNewsItem) {
	try {
		const payload = { data: newsData };

		const res = await axios.post(`${API_URL}/api/tidings`, payload);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при добавлении новости:", error);
		throw error;
	}
}

export async function updateNews(documentId: string, newsData: EditNewsItem) {
	try {
		const payload = { data: newsData };

		const res = await axios.put(
			`${API_URL}/api/tidings/${documentId}`,
			payload,
		);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при обновлении новости:", error);
		throw error;
	}
}

export async function deleteNews(documentId: string) {
	try {
		const res = await axios.delete(`${API_URL}/api/tidings/${documentId}`);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при удалении новости:", error);
		throw error;
	}
}

export async function updateNewsOrder(newsItems: NewsItem[]): Promise<void> {
	try {
		const updates = newsItems
			.filter((item) => item.featured)
			.map((item, index) => ({
				documentId: item.documentId,
				title: item.title,
				text: item.text,
				featured: item.featured,
				order: index,
			}));

		for (const update of updates) {
			if (update.documentId) {
				await axios.put(`${API_URL}/api/tidings/${update.documentId}`, {
					data: {
						title: update.title,
						text: update.text,
						featured: update.featured,
						order: update.order,
					},
				});
			}
		}
	} catch (error) {
		console.error("Ошибка при обновлении порядка новостей:", error);
		throw error;
	}
}
