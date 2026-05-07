import { JSX, useState, useEffect } from "react";
import {
	fetchCreators,
	addCreator,
	updateCreator,
	deleteCreator,
} from "@/api/creator";
import AdminHeader from "@/components/adminHeader/AdminHeader";
import styles from "./creatorsAdminPage.module.css";
import type { Creator } from "@/types/api/creator";

export default function CreatorsAdminPage(): JSX.Element {
	const [creators, setCreators] = useState<Creator[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const [editingDocId, setEditingDocId] = useState<string | null>(null);
	const [instagram, setInstagram] = useState("");
	const [photo, setPhoto] = useState("");
	const [worksPhotos, setWorksPhotos] = useState<string[]>([]);
	const [based, setBased] = useState("");
	const [style, setStyle] = useState("");
	const [hide, setHide] = useState(false);

	const loadCreators = async () => {
		setIsLoading(true);
		const data = await fetchCreators();
		setCreators(data || []);
		setIsLoading(false);
	};

	useEffect(() => {
		loadCreators();
	}, []);

	const handleEdit = (creator: Creator) => {
		setEditingDocId(creator.documentId);
		setInstagram(creator.instagram || "");
		// setPhoto(creator.photo || "");
		// setWorksPhotos(creator.worksPhotos || []);
		setBased(creator.based || "");
		setStyle(creator.style || "");
		setHide(!!creator.hide);
		window.scrollTo({ top: 0, behavior: "smooth" });
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

	const handleDelete = async (docId: string) => {
		if (!confirm("Вы уверены, что хотите удалить этого автора?")) return;

		try {
			await deleteCreator(docId);
			await loadCreators();
		} catch (error) {
			alert("Ошибка при удалении");
		}
	};

	if (isLoading) {
		return <div className={styles.container}>Загрузка...</div>;
	}

	return (
		<>
			<AdminHeader title="Управление креаторами" showBack />

			<div className={styles.container}>
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
								{isSaving
									? "Сохранение..."
									: editingDocId
										? "Обновить"
										: "Создать"}
							</button>
						</div>
					</form>
				</section>

				<div className={styles.list}>
					<h2>Список авторов</h2>
					{creators.length === 0 ? (
						<div className={styles.emptyState}>
							Список пока пуст. Добавьте первого автора выше!
						</div>
					) : (
						creators.map((creator) => (
							<div key={creator.documentId} className={styles.item}>
								<div className={styles.itemInfo}>
									<p>
										<b>Inst:</b> {creator.instagram || "—"}
									</p>

									<p>
										<b>Based:</b> {creator.based || "—"}
									</p>

									<p>
										<b>Style:</b> {creator.style || "—"}
									</p>

									<p>
										<b>Фото:</b>{" "}
										{creator.photo ? (
											<a
												href={creator.photo}
												target="_blank"
												rel="noopener noreferrer"
											>
												ссылка
											</a>
										) : (
											"—"
										)}
									</p>

									<p>
										<b>Работы:</b>{" "}
										{creator.worksPhotos && creator.worksPhotos.length > 0
											? creator.worksPhotos.map((url, i) => (
													<a
														key={i}
														href={url}
														target="_blank"
														rel="noopener noreferrer"
														style={{ marginRight: 4 }}
													>
														[{i + 1}]
													</a>
												))
											: "—"}
									</p>
									<p>
										<b>Скрыт:</b> {creator.hide ? "Да" : "Нет"}
									</p>
								</div>

								<div className={styles.itemActions}>
									<button
										onClick={() => handleEdit(creator)}
										className={styles.editButton}
									>
										Правка
									</button>
									<button
										onClick={() => handleDelete(creator.documentId)}
										className={styles.deleteButton}
									>
										Удалить
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
}
