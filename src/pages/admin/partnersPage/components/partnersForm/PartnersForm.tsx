import { JSX } from "react";
import styles from "./partnersForm.module.css";

interface PartnersFormProps {
	setEditingDocId: (id: string | null) => void;
	setName: (name: string) => void;
	setIsSaving: (isSaving: boolean) => void;
	editingDocId: string | null;
	name: string;
	isSaving: boolean;
	loadPartners: () => Promise<void>;
	addPartner: (partnerData: any) => Promise<void>;
	updatePartner: (documentId: string, partnerData: any) => Promise<void>;
}

export default function PartnersForm({
	setEditingDocId,
	setName,
	setIsSaving,
	editingDocId,
	name,
	isSaving,
	loadPartners,
	addPartner,
	updatePartner,
}: PartnersFormProps): JSX.Element {
	const handleCancel = () => {
		setEditingDocId(null);
		setName("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return alert("Имя партнера обязательно");

		setIsSaving(true);
		try {
			const partnerData = { name: name.trim() };

			if (editingDocId) {
				await updatePartner(editingDocId, partnerData);
			} else {
				await addPartner(partnerData);
			}
			handleCancel();
			await loadPartners();
			alert(editingDocId ? "Партнер обновлен" : "Партнер добавлен");
		} catch (error) {
			alert("Ошибка при сохранении");
			console.error("Ошибка при сохранении партнера:", error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<section className={styles.formSection}>
			<h2>{editingDocId ? "Редактировать" : "Добавить партнера"}</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputField}>
					<label>Имя партнера:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={styles.input}
						placeholder="Введите имя партнера..."
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
							onClick={handleCancel}
							className={styles.cancelButton}
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
