import styles from "./artistsPage.module.css";
import { JSX } from "react";

export default function ArtistsPage(): JSX.Element {
	return (
		<div className={styles.main}>
			<p className={styles.text}>Artists Page</p>
		</div>
	);
}
