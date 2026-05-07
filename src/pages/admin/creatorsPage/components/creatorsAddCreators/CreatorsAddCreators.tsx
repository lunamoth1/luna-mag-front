import { JSX } from "react";
import { deleteCreator } from "@/api/creator";
import { Creator } from "@/types/api/creator";
import styles from "./creatorsAddCreators.module.css";

interface CreatorsAddCreatorsProps {
	creators: Creator[];
	setEditingDocId: (value: string | null) => void;
	setInstagram: (value: string) => void;
	setBased: (value: string) => void;
	setStyle: (value: string) => void;
	setHide: (value: boolean) => void;
	loadCreators: () => void;
}

export default function CreatorsAddCreators({
	creators,
	setEditingDocId,
	setInstagram,
	setBased,
	setStyle,
	setHide,
	loadCreators,
}: CreatorsAddCreatorsProps): JSX.Element {
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

	const handleDelete = async (docId: string) => {
		if (!confirm("Вы уверены, что хотите удалить этого автора?")) return;

		try {
			await deleteCreator(docId);
			await loadCreators();
		} catch (error) {
			alert("Ошибка при удалении");
		}
	};

	return (
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
	);
}
