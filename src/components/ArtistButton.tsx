import { JSX } from "react";
import styles from "./artistButton.module.css";
import type { Creator } from "@/types/api/creator";

interface Props {
	creator: Creator;
}

export default function ArtistButton({ creator }: Props): JSX.Element {
	return (
		<button className={styles.container}>
			<div
				className={styles.photo}
				style={{
					backgroundImage: creator.photo ? `url(${creator.photo})` : undefined,
				}}
			></div>
			<p className={styles.name}>{creator.instagram}</p>
		</button>
	);
}
