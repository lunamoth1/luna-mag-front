import { JSX } from "react";
import styles from "./blogPage.module.css";

export default function BlogPage(): JSX.Element {
	return (
		<div className={styles.main}>
			<p className={styles.text}>Blog Page</p>
		</div>
	);
}
