import { JSX } from "react";
import { useCreatorsStore } from "@/store/creatorsStore";
import ArtistButton from "@/components/ArtistButton";
import styles from "./artistsPage.module.css";

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
