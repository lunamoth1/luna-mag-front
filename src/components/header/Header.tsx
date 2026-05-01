import { JSX } from "react";
import styles from "./header.module.css";

export default function Header(): JSX.Element {
	return (
		<header className={styles.header}>
			<img src="/src/assets/images/header.png" alt="img" />
		</header>
	);
}
