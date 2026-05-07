import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/constants";
import styles from "./artistButton.module.css";
import type { Creator } from "@/types/api/creator";

interface Props {
	creator: Creator;
}

export default function ArtistButton({ creator }: Props): JSX.Element {
	const photoUrl = creator.photo?.url
		? new URL(creator.photo.url, API_URL).href
		: undefined;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/artist/${creator.instagram}`);
	};

	return (
		<button className={styles.container} onClick={handleClick}>
			<img
				className={styles.photo}
				src={photoUrl}
				alt={creator.photo?.alternativeText || creator.instagram || "creator"}
			/>

			<p className={styles.name}>{creator.instagram}</p>
		</button>
	);
}
