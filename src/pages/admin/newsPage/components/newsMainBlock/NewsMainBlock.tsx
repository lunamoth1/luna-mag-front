import { JSX } from "react";
import styles from "./newsMainBlock.module.css";

interface NewsMainBlockProps {
	setEditingDocId: (id: string | null) => void;
	setTitle: (title: string) => void;
	setText: (text: string) => void;
	setFeatured: (featured: boolean) => void;
	setIsSaving: (isSaving: boolean) => void;
	editingDocId: string | null;
	title: string;
	text: string;
	featured: boolean;
	loadNews: () => Promise<void>;
	addNews: (newsData: any) => Promise<void>;
	updateNews: (documentId: string, newsData: any) => Promise<void>;
	isSaving: boolean;
}

export default function NewsMainBlock({
	setEditingDocId,
	setTitle,
	setText,
	setFeatured,
	setIsSaving,
	editingDocId,
	title,
	text,
	featured,
	loadNews,
	addNews,
	updateNews,
	isSaving,
}: NewsMainBlockProps): JSX.Element {
	const handleCancel = () => {
		setEditingDocId(null);
		setTitle("");
		setText("");
		setFeatured(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return alert("Заголовок обязателен");
		if (!text.trim()) return alert("Текст обязателен");

		setIsSaving(true);
		try {
			if (editingDocId) {
				await updateNews(editingDocId, {
					title,
					text,
					featured,
				});
			} else {
				await addNews({
					title,
					text,
					featured,
				});
			}
			handleCancel();
			await loadNews();
			alert(editingDocId ? "Обновлено" : "Создано");
		} catch (error) {
			alert("Ошибка при сохранении");
			console.error("Ошибка при сохранении новости:", error);
		} finally {
			setIsSaving(false);
		}
	};
	return (
		<section className={styles.formSection}>
			<h2>{editingDocId ? "Редактировать" : "Добавить новость"}</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputField}>
					<label>Заголовок:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={styles.input}
						placeholder="Введите заголовок новости..."
						required
					/>
				</div>
				<div className={styles.inputField}>
					<label>Текст:</label>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						className={styles.textarea}
						placeholder="Введите текст новости..."
						required
					/>
				</div>
				<div className={styles.inputField}>
					<label>
						<input
							type="checkbox"
							checked={featured}
							onChange={(e) => setFeatured(e.target.checked)}
						/>
						Избранная новость
					</label>
				</div>

				<div className={styles.formActions}>
					{editingDocId && (
						<button
							type="button"
							onClick={handleCancel}
							className={styles.cancelButton}
						>
							Отмена
						</button>
					)}
					<button
						type="submit"
						className={styles.submitButton}
						disabled={isSaving}
					>
						{isSaving ? "Сохранение..." : editingDocId ? "Обновить" : "Создать"}
					</button>
				</div>
			</form>
		</section>
	);
}
