import { JSX } from "react";
import styles from "./header.module.css";
import headerImg from "../../assets/images/header.png";

export default function Header(): JSX.Element {
	return (
		<header className={styles.header}>
			<img className={styles.img} src={headerImg} alt="img" />
			<p className={styles.text}>Unlimited Space</p>
		</header>
	);
}
