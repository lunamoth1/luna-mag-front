import { JSX } from "react";
import styles from "./header.module.css";
import headerImg from "../../assets/images/header.png";

export default function Header(): JSX.Element {
	return (
		<header className={styles.header}>
			<img src={headerImg} alt="img" />
		</header>
	);
}
