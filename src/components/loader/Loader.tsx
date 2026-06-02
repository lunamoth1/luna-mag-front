import { JSX } from "react";
import styles from "./loader.module.css";

interface LoaderProps {
	color?: "white" | "black";
}

export default function Loader({ color = "white" }: LoaderProps): JSX.Element {
	const isBlack = color === "black";
	const rgb = isBlack ? "0, 0, 0" : "255, 255, 255";
	const hex00 = isBlack ? "#00000000" : "#ffffff00";

	return (
		<div
			className={styles.loader}
			style={
				{
					"--loader-rgb": rgb,
					"--loader-hex-00": hex00,
				} as React.CSSProperties
			}
		/>
	);
}
