import { JSX, useState } from "react";
import {
	addCreator,
	updateCreator,
	uploadImageToStrapi,
	uploadMultipleImagesToStrapi,
} from "@/api/creator";
import styles from "./creatorsMainBlock.module.css";

interface CreatorsMainBlockProps {
	editingDocId: string | null;
	instagram: string;
	based: string;
	style: string;
	hide: boolean;
	setInstagram: (value: string) => void;
	setBased: (value: string) => void;
	setStyle: (value: string) => void;
	setHide: (value: boolean) => void;
	loadCreators: () => void;
	setEditingDocId: (value: string | null) => void;
}

export default function CreatorsMainBlock({
	editingDocId,
	instagram,
	based,
	style,
	hide,
	setInstagram,
	setBased,
	setStyle,
	setHide,
	loadCreators,
	setEditingDocId,
}: CreatorsMainBlockProps): JSX.Element {
	const [isSaving, setIsSaving] = useState(false);
	const [photoUrl, setPhotoUrl] = useState("");
	const [photoId, setPhotoId] = useState<number | null>(null);
	const [photoLoading, setPhotoLoading] = useState(false);

	const [worksPhotosUrls, setWorksPhotosUrls] = useState<string[]>([]);
	const [worksPhotosIds, setWorksPhotosIds] = useState<number[]>([]);
	const [worksPhotosLoading, setWorksPhotosLoading] = useState(false);

	const handleUploadPhoto = async () => {
		if (!photoUrl.trim()) return alert("Введите URL фото");

		setPhotoLoading(true);
		try {
			const id = await uploadImageToStrapi(photoUrl, "profile.jpg");
			setPhotoId(id);
			alert("Фото аватарки загружено успешно");
		} catch (error) {
			alert("Ошибка при загрузке фото");
			console.error(error);
		} finally {
			setPhotoLoading(false);
		}
	};

	const handleUploadWorksPhotos = async () => {
		const urlsToUpload = worksPhotosUrls.filter((url) => url.trim());
		if (urlsToUpload.length === 0) return alert("Добавьте хотя бы один URL");

		setWorksPhotosLoading(true);
		try {
			const ids = await uploadMultipleImagesToStrapi(urlsToUpload);
			setWorksPhotosIds(ids);
			alert(`${ids.length} фото работ загружено успешно`);
		} catch (error) {
			alert("Ошибка при загрузке фото работ");
			console.error(error);
		} finally {
			setWorksPhotosLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!instagram.trim()) return alert("Instagram обязателен");
		setIsSaving(true);
		try {
			const creatorData: any = {
				instagram,
				based,
				style,
				hide,
			};

			// Добавляем фото только если оно загружено
			if (photoId) {
				creatorData.photo = photoId;
			}

			// Добавляем фото работ только если они загружены
			if (worksPhotosIds.length > 0) {
				creatorData.worksPhotos = worksPhotosIds;
			}

			if (editingDocId) {
				await updateCreator(editingDocId, creatorData);
			} else {
				await addCreator(creatorData);
			}

			handleCancel();
			await loadCreators();
			alert(editingDocId ? "Обновлено" : "Создано");
		} catch (error) {
			alert("Ошибка при сохранении");
			console.error(error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setEditingDocId(null);
		setInstagram("");
		setPhotoUrl("");
		setPhotoId(null);
		setWorksPhotosUrls([]);
		setWorksPhotosIds([]);
		setBased("");
		setStyle("");
		setHide(false);
	};

	return (
		<section className={styles.formSection}>
			<h2>{editingDocId ? "Редактировать" : "Добавить нового"}</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputField}>
					<label>Instagram:</label>
					<input
						type="text"
						value={instagram}
						onChange={(e) => setInstagram(e.target.value)}
						className={styles.input}
						required
						disabled={isSaving}
					/>
				</div>

				<div className={styles.mediaSection}>
					<h3>Фото аватарки (Cloudinary URL)</h3>
					<div className={styles.urlInputGroup}>
						<input
							type="text"
							value={photoUrl}
							onChange={(e) => setPhotoUrl(e.target.value)}
							className={styles.input}
							placeholder="https://res.cloudinary.com/..."
							disabled={photoLoading || isSaving}
						/>
						<button
							type="button"
							onClick={handleUploadPhoto}
							className={styles.uploadButton}
							disabled={photoLoading || isSaving}
						>
							{photoLoading ? "Загрузка..." : "Загрузить"}
						</button>
					</div>
					{photoUrl && (
						<div className={styles.previewContainer}>
							<img
								src={photoUrl}
								alt="Превью фото"
								className={styles.profilePreview}
								onError={(e) => {
									(e.target as HTMLImageElement).style.display = "none";
								}}
							/>
						</div>
					)}
					{photoId && (
						<p className={styles.successText}>
							✓ Фото загружено (ID: {photoId})
						</p>
					)}
				</div>

				<div className={styles.mediaSection}>
					<h3>Фото работ (Cloudinary URLs)</h3>
					<div className={styles.multipleUrlsContainer}>
						{worksPhotosUrls.map((url, index) => (
							<div key={index}>
								<div className={styles.urlInputGroup}>
									<input
										type="text"
										value={url}
										onChange={(e) => {
											const newUrls = [...worksPhotosUrls];
											newUrls[index] = e.target.value;
											setWorksPhotosUrls(newUrls);
										}}
										className={styles.input}
										placeholder="https://res.cloudinary.com/..."
										disabled={worksPhotosLoading || isSaving}
									/>
									<button
										type="button"
										onClick={() => {
											setWorksPhotosUrls(
												worksPhotosUrls.filter((_, i) => i !== index),
											);
										}}
										className={styles.removeButton}
										disabled={worksPhotosLoading || isSaving}
									>
										✕
									</button>
								</div>
								{url && (
									<div className={styles.previewContainer}>
										<img
											src={url}
											alt={`Превью работы ${index}`}
											className={styles.preview}
											onError={(e) => {
												(e.target as HTMLImageElement).style.display = "none";
											}}
										/>
									</div>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={() => setWorksPhotosUrls([...worksPhotosUrls, ""])}
							className={styles.addButton}
							disabled={worksPhotosLoading || isSaving}
						>
							+ Добавить URL
						</button>
					</div>
					<button
						type="button"
						onClick={handleUploadWorksPhotos}
						className={styles.uploadButton}
						disabled={
							worksPhotosLoading ||
							isSaving ||
							worksPhotosUrls.filter((u) => u.trim()).length === 0
						}
					>
						{worksPhotosLoading ? "Загрузка..." : "Загрузить все"}
					</button>
					{worksPhotosIds.length > 0 && (
						<p className={styles.successText}>
							✓ Загружено {worksPhotosIds.length} фото
						</p>
					)}
				</div>

				<div className={styles.inputField}>
					<label>Город/страна:</label>
					<input
						type="text"
						value={based}
						onChange={(e) => setBased(e.target.value)}
						className={styles.input}
						disabled={isSaving}
					/>
				</div>

				<div className={styles.inputField}>
					<label>Стиль:</label>
					<input
						type="text"
						value={style}
						onChange={(e) => setStyle(e.target.value)}
						className={styles.input}
						disabled={isSaving}
					/>
				</div>

				<div className={styles.inputField}>
					<label>
						<input
							type="checkbox"
							checked={hide}
							onChange={(e) => setHide(e.target.checked)}
							disabled={isSaving}
						/>
						Скрыть автора
					</label>
				</div>

				<div className={styles.formActions}>
					{editingDocId && (
						<button
							type="button"
							onClick={handleCancel}
							className={styles.cancelButton}
							disabled={isSaving}
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
