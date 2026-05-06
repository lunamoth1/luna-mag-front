import { JSX } from "react";
import styles from "./header.module.css";
import headerImg from "../../assets/images/header.png";
import logoImg from "../../assets/images/logo.png";

export default function Header(): JSX.Element {
	return (
		<header className={styles.header}>
			<img className={styles.img} src={headerImg} alt="header" />
			<img className={styles.logo} src={logoImg} alt="logo" />
		</header>
	);
}
