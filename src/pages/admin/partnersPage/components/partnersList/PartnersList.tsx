import { JSX } from "react";
import styles from "./partnersList.module.css";
import type { Partner } from "@/types/api/partner";

interface PartnersListProps {
	partners: Partner[];
	handleEdit: (partner: Partner) => void;
	handleDelete: (docId: string | undefined) => Promise<void>;
}

export default function PartnersList({
	partners,
	handleEdit,
	handleDelete,
}: PartnersListProps): JSX.Element {
	return (
		<section className={styles.listSection}>
			<h2>Партнеры ({partners.length})</h2>

			{partners.length === 0 ? (
				<p className={styles.emptyMessage}>Партнеры еще не добавлены</p>
			) : (
				<div className={styles.list}>
					{partners.map((partner) => (
						<div key={partner.id} className={styles.item}>
							<div className={styles.itemContent}>
								<h3>{partner.name}</h3>
								<p className={styles.date}>
									{partner.updatedAt
										? new Date(partner.updatedAt).toLocaleDateString("ru-RU")
										: ""}
								</p>
							</div>

							<div className={styles.actions}>
								<button
									onClick={() => handleEdit(partner)}
									className={styles.editButton}
									title="Редактировать"
								>
									Редактировать
								</button>

								<button
									onClick={() => handleDelete(partner.documentId)}
									className={styles.deleteButton}
									title="Удалить"
								>
									Удалить
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
