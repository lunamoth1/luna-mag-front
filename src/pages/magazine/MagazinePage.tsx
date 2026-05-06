import { JSX } from "react";
import HomeBanner from "@/components/homeBanner/HomeBanner";
import styles from "./magazinePage.module.css";

export default function MagazinePage(): JSX.Element {
	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<HomeBanner />
			</div>
		</div>
	);
}
