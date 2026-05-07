import { JSX, useState } from "react";
import { addCreator, updateCreator } from "@/api/creator";
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
	const [photo, setPhoto] = useState("");
	const [worksPhotos, setWorksPhotos] = useState<string[]>([]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!instagram.trim()) return alert("Instagram обязателен");
		setIsSaving(true);
		try {
			if (editingDocId) {
				await updateCreator(editingDocId, {
					instagram,
					based,
					style,
					hide,
				});
			} else {
				await addCreator({
					instagram,
					based,
					style,
					hide,
					// photo,
					// worksPhotos,
				});
			}
			handleCancel();
			await loadCreators();
			alert(editingDocId ? "Обновлено" : "Создано");
		} catch (error) {
			alert("Ошибка при сохранении");
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setEditingDocId(null);
		setInstagram("");
		// setPhoto("");
		// setWorksPhotos([]);
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
					/>
				</div>
				<div className={styles.inputField}>
					<label>Фото (URL):</label>
					<input
						type="text"
						value={photo}
						onChange={(e) => setPhoto(e.target.value)}
						className={styles.input}
						disabled
					/>
				</div>
				<div className={styles.inputField}>
					<label>Фото работ (через запятую, URL):</label>
					<input
						type="text"
						value={worksPhotos.join(",")}
						onChange={(e) =>
							setWorksPhotos(
								e.target.value
									.split(",")
									.map((s) => s.trim())
									.filter(Boolean),
							)
						}
						className={styles.input}
						disabled
					/>
				</div>
				<div className={styles.inputField}>
					<label>Город/страна:</label>
					<input
						type="text"
						value={based}
						onChange={(e) => setBased(e.target.value)}
						className={styles.input}
					/>
				</div>
				<div className={styles.inputField}>
					<label>Стиль:</label>
					<input
						type="text"
						value={style}
						onChange={(e) => setStyle(e.target.value)}
						className={styles.input}
					/>
				</div>
				<div className={styles.inputField}>
					<label>
						<input
							type="checkbox"
							checked={hide}
							onChange={(e) => setHide(e.target.checked)}
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
