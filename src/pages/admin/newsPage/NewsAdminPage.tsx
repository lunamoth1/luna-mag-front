import { JSX, useState, useEffect } from "react";
import { fetchNews, addNews, updateNews, deleteNews } from "@/api/news";
import AdminHeader from "@/components/adminHeader/AdminHeader";
import NewsMainBlock from "./components/newsMainBlock/NewsMainBlock";
import NewsAllNews from "./components/newsAllNews/NewsAllNews";
import NewsFeatured from "./components/newsFeatured/NewsFeatured";
import styles from "./newsAdminPage.module.css";
import type { NewsItem } from "@/types/api/news";

export default function NewsAdminPage(): JSX.Element {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const [editingDocId, setEditingDocId] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [featured, setFeatured] = useState(false);

	const loadNews = async () => {
		setIsLoading(true);
		try {
			const data = await fetchNews();
			setNews(data || []);
		} catch (error) {
			console.error("Ошибка при загрузке новостей:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadNews();
	}, []);

	const handleEdit = (newsItem: NewsItem) => {
		setEditingDocId(newsItem.documentId || null);
		setTitle(newsItem.title || "");
		setText(newsItem.text || "");
		setFeatured(!!newsItem.featured);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleDelete = async (docId: string | undefined) => {
		if (!docId) return;
		if (!confirm("Вы уверены, что хотите удалить эту новость?")) return;

		try {
			await deleteNews(docId);
			await loadNews();
		} catch (error) {
			alert("Ошибка при удалении");
			console.error("Ошибка при удалении новости:", error);
		}
	};

	if (isLoading) {
		return <div className={styles.container}>Загрузка...</div>;
	}

	return (
		<>
			<AdminHeader title="Управление новостями" showBack />

			<div className={styles.container}>
				<NewsMainBlock
					editingDocId={editingDocId}
					title={title}
					text={text}
					featured={featured}
					isSaving={isSaving}
					setTitle={setTitle}
					setText={setText}
					setFeatured={setFeatured}
					loadNews={loadNews}
					addNews={addNews}
					updateNews={updateNews}
					setEditingDocId={setEditingDocId}
					setIsSaving={setIsSaving}
				/>

				<NewsFeatured
					news={news}
					isSaving={isSaving}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					setIsSaving={setIsSaving}
					loadNews={loadNews}
				/>

				<NewsAllNews
					news={news}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</div>
		</>
	);
}
