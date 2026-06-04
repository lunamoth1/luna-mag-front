import { JSX } from "react";
import { usePartnerStore } from "@/store/partnerStore";
import styles from "./partnersPage.module.css";

export default function PartnersPage(): JSX.Element {
	const { partners } = usePartnerStore();

	if (partners.length === 0) {
		return <div className={styles.main}>Partners will be available soon</div>;
	}

	return (
		<div className={styles.main}>
			{partners.map((partner) => (
				<p key={partner.id} className={styles.text}>
					{partner.name}
				</p>
			))}
		</div>
	);
}
