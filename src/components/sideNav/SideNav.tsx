import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import WinButton from "../winButton/WinButton";
import styles from "./sideNav.module.css";
import { NAV_LINKS } from "@/constants/navigation";

interface SideNavProps {
	isOpen?: boolean;
	onClose?: () => void;
}

export default function SideNav({
	isOpen = false,
	onClose,
}: SideNavProps): JSX.Element {
	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		navigate(path);
		onClose?.();
	};

	return (
		<nav className={`${styles.sideNav} ${isOpen ? styles.open : ""}`}>
			<ul className={styles.navList}>
				{NAV_LINKS.map((link) => (
					<li key={link.name} className={styles.navItem}>
						<WinButton
							onClick={() => handleNavigate(link.path)}
							label={link.name}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
