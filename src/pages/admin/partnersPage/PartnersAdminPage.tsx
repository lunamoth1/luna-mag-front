import { JSX, useState, useEffect } from "react";
import {
	fetchPartners,
	addPartner,
	updatePartner,
	deletePartner,
} from "@/api/partner";
import AdminHeader from "@/components/adminHeader/AdminHeader";
import PartnersForm from "./components/partnersForm/PartnersForm";
import PartnersList from "./components/partnersList/PartnersList";
import styles from "./partnersAdminPage.module.css";
import type { Partner } from "@/types/api/partner";

export default function PartnersAdminPage(): JSX.Element {
	const [partners, setPartners] = useState<Partner[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const [editingDocId, setEditingDocId] = useState<string | null>(null);
	const [name, setName] = useState("");

	const loadPartners = async () => {
		setIsLoading(true);
		try {
			const data = await fetchPartners();
			setPartners(data || []);
		} catch (error) {
			console.error("Ошибка при загрузке партнеров:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadPartners();
	}, []);

	const handleEdit = (partner: Partner) => {
		setEditingDocId(partner.documentId || null);
		setName(partner.name || "");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleDelete = async (docId: string | undefined) => {
		if (!docId) return;
		if (!confirm("Вы уверены, что хотите удалить этого партнера?")) return;

		try {
			await deletePartner(docId);
			await loadPartners();
		} catch (error) {
			alert("Ошибка при удалении");
			console.error("Ошибка при удалении партнера:", error);
		}
	};

	if (isLoading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	return (
		<>
			<AdminHeader title="Управление партнерами" showBack />

			<div className={styles.container}>
				<PartnersForm
					editingDocId={editingDocId}
					name={name}
					isSaving={isSaving}
					setName={setName}
					loadPartners={loadPartners}
					addPartner={addPartner}
					updatePartner={updatePartner}
					setEditingDocId={setEditingDocId}
					setIsSaving={setIsSaving}
				/>

				<PartnersList
					partners={partners}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</div>
		</>
	);
}
