import { JSX } from "react";
import styles from "./eventsPage.module.css";

export default function EventsPage(): JSX.Element {
	if (true) {
		return <p className={styles.emptyState}>Events not available right now</p>;
	}

	return <div className={styles.main}></div>;
}
