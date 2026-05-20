import { JSX } from "react";
import styles from "./eventsPage.module.css";

export default function EventsPage(): JSX.Element {
	return (
		<div className={styles.main}>
			<p className={styles.text}>Events not available right now</p>
		</div>
	);
}
