import { JSX, useState } from "react";
import { updateNewsOrder } from "@/api/news";
import styles from "./newsFeatured.module.css";
import type { NewsItem } from "@/types/api/news";

interface NewsFeaturedProps {
	news: NewsItem[];
	isSaving: boolean;
	handleEdit: (newsItem: NewsItem) => void;
	handleDelete: (documentId?: string) => void;
	setIsSaving: (saving: boolean) => void;
	loadNews: () => void;
}

export default function NewsFeatured({
	news,
	isSaving,
	handleEdit,
	handleDelete,
	setIsSaving,
	loadNews,
}: NewsFeaturedProps): JSX.Element {
	const [editingFeatured, setEditingFeatured] = useState<NewsItem[] | null>(
		null,
	);

	const handleMoveFeaturedUp = (index: number) => {
		if (!editingFeatured || index === 0) return;
		const updated = [...editingFeatured];
		[updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
		setEditingFeatured(updated);
	};

	const handleMoveFeaturedDown = (index: number) => {
		if (!editingFeatured || index === editingFeatured.length - 1) return;
		const updated = [...editingFeatured];
		[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
		setEditingFeatured(updated);
	};

	const startEditingFeaturedOrder = () => {
		const featured = news.filter((n) => n.featured);
		setEditingFeatured([...featured]);
	};

	const cancelEditingFeaturedOrder = () => {
		setEditingFeatured(null);
	};

	const saveFeaturedOrder = async () => {
		if (!editingFeatured) return;

		setIsSaving(true);
		try {
			await updateNewsOrder(editingFeatured);
			await loadNews();
			setEditingFeatured(null);
		} catch (error) {
			alert("Ошибка при сохранении порядка");
			console.error("Ошибка:", error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className={styles.list}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "1rem",
				}}
			>
				<h2 style={{ margin: 0 }}>Избранные новости</h2>
				{editingFeatured === null &&
					news.filter((n) => n.featured).length > 0 && (
						<button
							onClick={startEditingFeaturedOrder}
							className={styles.editButton}
						>
							Редактировать порядок
						</button>
					)}
			</div>
			{news.filter((n) => n.featured).length === 0 ? (
				<div className={styles.emptyState}>
					Нет избранных новостей. Отметьте новости как "Избранные" выше.
				</div>
			) : editingFeatured !== null ? (
				<>
					{editingFeatured.map((newsItem, index) => (
						<div key={newsItem.documentId} className={styles.featuredItem}>
							<div className={styles.orderNumber}>{index + 1}</div>
							<div className={styles.itemInfo}>
								<h3>{newsItem.title}</h3>
								<p>{newsItem.text}</p>
							</div>
							<div className={styles.orderActions}>
								<button
									onClick={() => handleMoveFeaturedUp(index)}
									className={styles.orderButton}
									disabled={index === 0}
									title="Поднять вверх"
								>
									↑
								</button>
								<button
									onClick={() => handleMoveFeaturedDown(index)}
									className={styles.orderButton}
									disabled={index === editingFeatured.length - 1}
									title="Опустить вниз"
								>
									↓
								</button>
							</div>
							<div className={styles.itemActions}>
								<button
									onClick={() => handleEdit(newsItem)}
									className={styles.editButton}
								>
									Изменить
								</button>
								<button
									onClick={() => handleDelete(newsItem.documentId)}
									className={styles.deleteButton}
								>
									Удалить
								</button>
							</div>
						</div>
					))}
					<div className={styles.formActions} style={{ marginTop: "1rem" }}>
						<button
							onClick={cancelEditingFeaturedOrder}
							className={styles.cancelButton}
							disabled={isSaving}
						>
							Отменить
						</button>
						<button
							onClick={saveFeaturedOrder}
							className={styles.submitButton}
							disabled={isSaving}
						>
							{isSaving ? "Сохранение..." : "Сохранить"}
						</button>
					</div>
				</>
			) : (
				news
					.filter((n) => n.featured)
					.map((newsItem, index) => (
						<div key={newsItem.documentId} className={styles.featuredItem}>
							<div className={styles.orderNumber}>{index + 1}</div>
							<div className={styles.itemInfo}>
								<h3>{newsItem.title}</h3>
								<p>{newsItem.text}</p>
							</div>
							<div className={styles.itemActions}>
								<button
									onClick={() => handleEdit(newsItem)}
									className={styles.editButton}
								>
									Изменить
								</button>
								<button
									onClick={() => handleDelete(newsItem.documentId)}
									className={styles.deleteButton}
								>
									Удалить
								</button>
							</div>
						</div>
					))
			)}
		</div>
	);
}
