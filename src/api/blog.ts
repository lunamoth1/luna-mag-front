import axios from "axios";
import { API_URL } from "@/constants";
import type { BlogPost, EditBlogPost } from "@/types/api/blog";

export async function fetchBlogs(): Promise<BlogPost[]> {
	try {
		const res = await axios.get(
			`${API_URL}/api/blogs?populate=*&pagination[pageSize]=1000`,
		);

		const data = res.data?.data || [];

		return data.map((item: BlogPost) => ({
			id: item.id,
			documentId: item.documentId,
			title: item.title,
			text: item.text,
			createdAt: item.createdAt,
			updatedAt: item.updatedAt,
		}));
	} catch (error) {
		console.error("Ошибка при получении списка постов:", error);
		return [];
	}
}

export async function addBlogPost(blogData: EditBlogPost) {
	try {
		const payload = { data: blogData };

		const res = await axios.post(`${API_URL}/api/blogs`, payload);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при добавлении поста:", error);
		throw error;
	}
}

export async function updateBlogPost(
	documentId: string,
	blogData: EditBlogPost,
) {
	try {
		const payload = { data: blogData };

		const res = await axios.put(`${API_URL}/api/blogs/${documentId}`, payload);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при обновлении поста:", error);
		throw error;
	}
}

export async function deleteBlogPost(documentId: string) {
	try {
		const res = await axios.delete(`${API_URL}/api/blogs/${documentId}`);

		return res.data?.data;
	} catch (error) {
		console.error("Ошибка при удалении поста:", error);
		throw error;
	}
}
