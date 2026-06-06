import { JSX } from "react";
import logoImg from "../../assets/images/logo.png";
import headerImg from "../../assets/images/header.png";
import styles from "./header.module.css";

interface HeaderProps {
	onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps): JSX.Element {
	return (
		<header className={styles.header}>
			<button
				className={styles.burger}
				onClick={onMenuToggle}
				aria-label="Toggle menu"
			>
				<span />
				<span />
				<span />
			</button>

			<img className={styles.img} src={headerImg} alt="header" />
			<img className={styles.logo} src={logoImg} alt="logo" />
		</header>
	);
}
