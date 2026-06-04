import { JSX } from "react";
import styles from "./galleriesForm.module.css";

interface GalleriesFormProps {
	setEditingDocId: (id: string | null) => void;
	setImageUrl: (url: string) => void;
	setLink: (link: string) => void;
	setIsSaving: (isSaving: boolean) => void;
	editingDocId: string | null;
	imageUrl: string;
	link: string;
	isSaving: boolean;
	loadGalleries: () => Promise<void>;
	addGallery: (galleryData: any) => Promise<void>;
	updateGallery: (documentId: string, galleryData: any) => Promise<void>;
}

export default function GalleriesForm({
	setEditingDocId,
	setImageUrl,
	setLink,
	setIsSaving,
	editingDocId,
	imageUrl,
	link,
	isSaving,
	loadGalleries,
	addGallery,
	updateGallery,
}: GalleriesFormProps): JSX.Element {
	const handleCancel = () => {
		setEditingDocId(null);
		setImageUrl("");
		setLink("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!imageUrl.trim()) return alert("URL изображения обязателен");
		if (!link.trim()) return alert("Ссылка обязательна");

		setIsSaving(true);
		try {
			const galleryData = {
				image: { url: imageUrl.trim() },
				link: link.trim(),
			};

			if (editingDocId) {
				await updateGallery(editingDocId, galleryData);
			} else {
				await addGallery(galleryData);
			}
			handleCancel();
			await loadGalleries();
			alert(editingDocId ? "Элемент обновлен" : "Элемент добавлен");
		} catch (error) {
			alert("Ошибка при сохранении");
			console.error("Ошибка при сохранении элемента галереи:", error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<section className={styles.formSection}>
			<h2>{editingDocId ? "Редактировать" : "Добавить в галерею"}</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputField}>
					<label>URL изображения:</label>
					<input
						type="url"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						className={styles.input}
						placeholder="https://example.com/image.jpg"
						required
						disabled={isSaving}
					/>
				</div>

				<div className={styles.inputField}>
					<label>Ссылка:</label>
					<input
						type="url"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						className={styles.input}
						placeholder="https://example.com"
						required
						disabled={isSaving}
					/>
				</div>

				<div className={styles.actions}>
					<button
						type="submit"
						className={styles.submitButton}
						disabled={isSaving}
					>
						{isSaving
							? "Сохранение..."
							: editingDocId
								? "Обновить"
								: "Добавить"}
					</button>

					{editingDocId && (
						<button
							type="button"
							className={styles.cancelButton}
							onClick={handleCancel}
							disabled={isSaving}
						>
							Отмена
						</button>
					)}
				</div>
			</form>
		</section>
	);
}
