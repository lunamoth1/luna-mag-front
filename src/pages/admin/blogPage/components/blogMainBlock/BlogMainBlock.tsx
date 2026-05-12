import { JSX, useState } from "react";
import { uploadImageToStrapi } from "@/api/creator";
import { getImageUrl } from "@/utils/imageUrl";
import type { BlogImage } from "@/types/api/blog";
import styles from "./blogMainBlock.module.css";

interface BlogMainBlockProps {
	setEditingDocId: (id: string | null) => void;
	setTitle: (title: string) => void;
	setText: (text: string) => void;
	setIsSaving: (isSaving: boolean) => void;
	setUploadedImages: (images: BlogImage[]) => void;
	editingDocId: string | null;
	title: string;
	text: string;
	uploadedImages: BlogImage[];
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
	setUploadedImages,
	editingDocId,
	title,
	text,
	uploadedImages,
	loadBlogs,
	addBlogPost,
	updateBlogPost,
	isSaving,
}: BlogMainBlockProps): JSX.Element {
	const [imageUrl, setImageUrl] = useState("");
	const [imageDescription, setImageDescription] = useState("");
	const [isUploadingImage, setIsUploadingImage] = useState(false);

	const handleCancel = () => {
		setEditingDocId(null);
		setTitle("");
		setText("");
		setUploadedImages([]);
		setImageUrl("");
		setImageDescription("");
	};

	const handleAddImage = async () => {
		if (!imageUrl.trim()) {
			alert("Введите URL фото");
			return;
		}
		if (!imageDescription.trim()) {
			alert("Введите описание фото");
			return;
		}

		setIsUploadingImage(true);
		try {
			const fileName = `blog-image-${Date.now()}.jpg`;
			const fileId = await uploadImageToStrapi(imageUrl, fileName);

			const newImage: BlogImage = {
				id: `img-${Date.now()}`,
				fileId,
				description: imageDescription,
				url: imageUrl,
			};

			setUploadedImages([...uploadedImages, newImage]);
			setImageUrl("");
			setImageDescription("");
		} catch (error) {
			alert("Ошибка при загрузке фото");
			console.error("Ошибка:", error);
		} finally {
			setIsUploadingImage(false);
		}
	};

	const handleRemoveImage = (id: string) => {
		setUploadedImages(uploadedImages.filter((img) => img.id !== id));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return alert("Заголовок обязателен");
		if (!text.trim()) return alert("Текст обязателен");

		setIsSaving(true);
		try {
			const blogData = {
				title,
				text,
				images: uploadedImages,
			};

			if (editingDocId) {
				await updateBlogPost(editingDocId, blogData);
			} else {
				await addBlogPost(blogData);
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

				<div className={styles.imagesSection}>
					<h3>Добавить фото</h3>
					<div className={styles.inputField}>
						<label>URL фото из Cloudinary:</label>
						<input
							type="text"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className={styles.input}
							placeholder="Введите URL фото..."
							disabled={isUploadingImage || isSaving}
						/>
					</div>
					<div className={styles.inputField}>
						<label>Описание фото:</label>
						<textarea
							value={imageDescription}
							onChange={(e) => setImageDescription(e.target.value)}
							className={styles.textarea}
							placeholder="Описание фото для галереи..."
							disabled={isUploadingImage || isSaving}
							rows={2}
						/>
					</div>
					<button
						type="button"
						onClick={handleAddImage}
						className={styles.addImageButton}
						disabled={isUploadingImage || isSaving}
					>
						{isUploadingImage ? "Загрузка..." : "Добавить фото"}
					</button>

					{uploadedImages.length > 0 && (
						<div className={styles.imagesList}>
							<h4>Загруженные фото ({uploadedImages.length})</h4>
							<div className={styles.imagesGrid}>
								{uploadedImages.map((img) => (
									<div key={img.id} className={styles.imageCard}>
										<img
											src={getImageUrl(img.url)}
											alt={img.description}
											className={styles.imageThumbnail}
										/>
										<div className={styles.imageInfo}>
											<p className={styles.imageDesc}>{img.description}</p>
											<button
												type="button"
												onClick={() => handleRemoveImage(img.id)}
												className={styles.removeImageButton}
												disabled={isSaving}
											>
												Удалить
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
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
