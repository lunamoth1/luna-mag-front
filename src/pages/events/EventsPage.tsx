import styles from "./eventsPage.module.css";
import { JSX } from "react";

export default function EventsPage(): JSX.Element {
	return (
		<div className={styles.main}>
			<p className={styles.text}>Events Page</p>
		</div>
	);
}
