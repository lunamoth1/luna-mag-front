import { JSX } from "react";
import { deleteCreator } from "@/api/creator";
import { getImageUrl } from "@/utils/imageUrl";
import { Creator } from "@/types/api/creator";
import styles from "./creatorsList.module.css";

interface CreatorsListProps {
	creators: Creator[];
	setEditingDocId: (value: string | null) => void;
	setInstagram: (value: string) => void;
	setBased: (value: string) => void;
	setStyle: (value: string) => void;
	setHide: (value: boolean) => void;
	setPhoto: (value: any) => void;
	setWorksPhotos: (value: any[]) => void;
	loadCreators: () => void;
}

export default function CreatorsList({
	creators,
	setEditingDocId,
	setInstagram,
	setBased,
	setStyle,
	setHide,
	setPhoto,
	setWorksPhotos,
	loadCreators,
}: CreatorsListProps): JSX.Element {
	const getPhotoUrl = (photo: any): string | null => {
		if (!photo) return null;
		if (typeof photo === "string") return getImageUrl(photo);
		if (photo.url) return getImageUrl(photo.url);
		return null;
	};

	const getWorksPhotosUrls = (worksPhotos: any[]): string[] => {
		if (!Array.isArray(worksPhotos)) return [];
		return worksPhotos
			.map((item) => {
				if (typeof item === "string") return getImageUrl(item);
				if (item.url) return getImageUrl(item.url);
				return null;
			})
			.filter(Boolean) as string[];
	};

	const handleEdit = (creator: Creator) => {
		setEditingDocId(creator.documentId);
		setInstagram(creator.instagram || "");
		setPhoto(creator.photo || null);
		setWorksPhotos(creator.worksPhotos || []);
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

							<div className={styles.photoSection}>
								<p>
									<b>Фото:</b>{" "}
								</p>
								{getPhotoUrl(creator.photo) && (
									<div className={styles.photoPreview}>
										<img
											src={getPhotoUrl(creator.photo)!}
											alt="Фото профиля"
											onError={(e) => {
												(e.target as HTMLImageElement).style.display = "none";
											}}
										/>
									</div>
								)}
							</div>

							<div>
								<p>
									<b>Работы:</b>{" "}
								</p>
								{getWorksPhotosUrls(creator.worksPhotos as any[]).length >
									0 && (
									<>
										<div className={styles.worksPreview}>
											{getWorksPhotosUrls(creator.worksPhotos as any[]).map(
												(url, i) => (
													<div key={i} className={styles.worksThumbnail}>
														<img
															src={url}
															alt={`Работа ${i + 1}`}
															onError={(e) => {
																(e.target as HTMLImageElement).style.display =
																	"none";
															}}
														/>
													</div>
												),
											)}
										</div>
									</>
								)}
							</div>
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
