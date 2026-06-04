import { JSX, useState, useEffect } from "react";
import {
	fetchGalleries,
	addGallery,
	updateGallery,
	deleteGallery,
} from "@/api/galleries";
import AdminHeader from "@/components/adminHeader/AdminHeader";
import GalleriesForm from "./components/galleriesForm/GalleriesForm";
import GalleriesList from "./components/galleriesList/GalleriesList";
import styles from "./galleriesAdminPage.module.css";
import type { Gallery } from "@/types/api/galleries";

export default function GalleriesAdminPage(): JSX.Element {
	const [galleries, setGalleries] = useState<Gallery[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const [editingDocId, setEditingDocId] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState("");
	const [link, setLink] = useState("");

	const loadGalleries = async () => {
		setIsLoading(true);
		try {
			const data = await fetchGalleries();
			setGalleries(data || []);
		} catch (error) {
			console.error("Ошибка при загрузке галереи:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadGalleries();
	}, []);

	const handleEdit = (gallery: Gallery) => {
		setEditingDocId(gallery.documentId || null);
		setImageUrl(gallery.image?.url || "");
		setLink(gallery.link || "");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleDelete = async (docId: string | undefined) => {
		if (!docId) return;
		if (!confirm("Вы уверены, что хотите удалить этот элемент из галереи?"))
			return;

		try {
			await deleteGallery(docId);
			await loadGalleries();
		} catch (error) {
			alert("Ошибка при удалении");
			console.error("Ошибка при удалении из галереи:", error);
		}
	};

	if (isLoading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	return (
		<>
			<AdminHeader title="Управление галереей" showBack />

			<div className={styles.container}>
				<GalleriesForm
					editingDocId={editingDocId}
					imageUrl={imageUrl}
					link={link}
					isSaving={isSaving}
					setImageUrl={setImageUrl}
					setLink={setLink}
					loadGalleries={loadGalleries}
					addGallery={addGallery}
					updateGallery={updateGallery}
					setEditingDocId={setEditingDocId}
					setIsSaving={setIsSaving}
				/>

				<GalleriesList
					galleries={galleries}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</div>
		</>
	);
}
