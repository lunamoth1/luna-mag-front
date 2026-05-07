import { JSX } from "react";
import { NewsItem } from "@/types/api/news";
import styles from "./newsAllNews.module.css";

interface NewsAllNewsProps {
	news: NewsItem[];
	handleEdit: (newsItem: NewsItem) => void;
	handleDelete: (documentId?: string) => void;
}

export default function NewsAllNews({
	news,
	handleEdit,
	handleDelete,
}: NewsAllNewsProps): JSX.Element {
	return (
		<div className={styles.list}>
			<h2>Все новости</h2>
			{news.length === 0 ? (
				<div className={styles.emptyState}>Новостей нет.</div>
			) : (
				news.map((newsItem) => (
					<div key={newsItem.documentId} className={styles.item}>
						<div className={styles.itemInfo}>
							<h3>{newsItem.title}</h3>
							<p>{newsItem.text}</p>
							<div
								style={{
									marginTop: "0.5rem",
									fontSize: "0.85rem",
									color: "#999",
								}}
							>
								{newsItem.featured && <span>⭐ Избранная | </span>}
								{newsItem.createdAt && (
									<span>
										{new Date(newsItem.createdAt).toLocaleDateString("ru-RU")}
									</span>
								)}
							</div>
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
