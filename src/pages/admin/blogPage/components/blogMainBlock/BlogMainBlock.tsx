import { JSX } from "react";
import styles from "./blogMainBlock.module.css";

interface BlogMainBlockProps {
	setEditingDocId: (id: string | null) => void;
	setTitle: (title: string) => void;
	setText: (text: string) => void;
	setIsSaving: (isSaving: boolean) => void;
	editingDocId: string | null;
	title: string;
	text: string;
	loadBlogs: () => Promise<void>;
	addBlogPost: (blogData: any) => Promise<void>;
	updateBlogPost: (documentId: string, blogData: any) => Promise<void>;
	isSaving: boolean;
}

export default function BlogMainBlock({
	setEditingDocId,
	setTitle,
	setText,
	setIsSaving,
	editingDocId,
	title,
	text,
	loadBlogs,
	addBlogPost,
	updateBlogPost,
	isSaving,
}: BlogMainBlockProps): JSX.Element {
	const handleCancel = () => {
		setEditingDocId(null);
		setTitle("");
		setText("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return alert("Заголовок обязателен");
		if (!text.trim()) return alert("Текст обязателен");

		setIsSaving(true);
		try {
			if (editingDocId) {
				await updateBlogPost(editingDocId, {
					title,
					text,
				});
			} else {
				await addBlogPost({
					title,
					text,
				});
			}
			handleCancel();
			await loadBlogs();
			alert(editingDocId ? "Обновлено" : "Создано");
		} catch (error) {
			alert("Ошибка при сохранении");
			console.error("Ошибка при сохранении поста:", error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<section className={styles.formSection}>
			<h2>{editingDocId ? "Редактировать" : "Добавить пост"}</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputField}>
					<label>Заголовок:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={styles.input}
						placeholder="Введите заголовок поста..."
						required
						disabled={isSaving}
					/>
				</div>
				<div className={styles.inputField}>
					<label>Текст:</label>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						className={styles.textarea}
						placeholder="Введите текст поста..."
						required
						disabled={isSaving}
					/>
				</div>
				<div className={styles.formActions}>
					<button
						type="button"
						onClick={handleCancel}
						className={styles.cancelButton}
						disabled={isSaving}
					>
						Отмена
					</button>
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
