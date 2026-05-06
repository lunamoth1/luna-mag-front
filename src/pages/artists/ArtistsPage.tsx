import { JSX } from "react";
import ArtistButton from "@/components/ArtistButton";
import styles from "./artistsPage.module.css";
import { useCreatorsStore } from "@/store/creatorsStore";

export default function ArtistsPage(): JSX.Element {
	const creators = useCreatorsStore((s) => s.creators);
	return (
		<div className={styles.main}>
			{creators
				.filter((c) => !c.hide)
				.map((creator) => (
					<ArtistButton key={creator.documentId} creator={creator} />
				))}
		</div>
	);
}
