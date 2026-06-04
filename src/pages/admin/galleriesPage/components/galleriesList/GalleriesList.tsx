import { JSX } from "react";
import styles from "./galleriesList.module.css";
import type { Gallery } from "@/types/api/galleries";

interface GalleriesListProps {
	galleries: Gallery[];
	handleEdit: (gallery: Gallery) => void;
	handleDelete: (docId: string | undefined) => Promise<void>;
}

export default function GalleriesList({
	galleries,
	handleEdit,
	handleDelete,
}: GalleriesListProps): JSX.Element {
	return (
		<section className={styles.listSection}>
			<h2>Галерея ({galleries.length})</h2>

			{galleries.length === 0 ? (
				<p className={styles.emptyMessage}>Элементы галереи еще не добавлены</p>
			) : (
				<div className={styles.list}>
					{galleries.map((gallery) => (
						<div key={gallery.id} className={styles.item}>
							<div className={styles.itemImage}>
								<img
									src={gallery.image?.url}
									alt="Галерея"
									className={styles.image}
								/>
							</div>

							<div className={styles.itemContent}>
								<h3 className={styles.link}>
									<a
										href={gallery.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										{gallery.link}
									</a>
								</h3>
								<p className={styles.imageUrl}>{gallery.image?.url}</p>
								<p className={styles.date}>
									{gallery.updatedAt
										? new Date(gallery.updatedAt).toLocaleDateString("ru-RU")
										: ""}
								</p>
							</div>

							<div className={styles.actions}>
								<button
									onClick={() => handleEdit(gallery)}
									className={styles.editButton}
									title="Редактировать"
								>
									Редактировать
								</button>

								<button
									onClick={() => handleDelete(gallery.documentId)}
									className={styles.deleteButton}
									title="Удалить"
								>
									Удалить
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
