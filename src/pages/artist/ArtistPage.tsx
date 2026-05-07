import { useParams } from "react-router-dom";
import { useCreatorsStore } from "@/store/creatorsStore";
import { API_URL } from "@/constants";
import styles from "./artistPage.module.css";

export default function ArtistPage() {
	const { instagram } = useParams<{ instagram: string }>();
	const creator = useCreatorsStore((s) =>
		s.creators.find((c) => c.instagram === instagram),
	);

	if (!creator) {
		return <div className={styles.notFound}>Author not found</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.worksList}>
				{creator.worksPhotos &&
					creator.worksPhotos.length > 0 &&
					creator.worksPhotos.map((img, i) => (
						<img
							key={img.id || i}
							className={styles.workImg}
							src={
								img.url.startsWith("http") ? img.url : `${API_URL}${img.url}`
							}
							alt={img.alternativeText || `work ${i + 1}`}
						/>
					))}
			</div>

			<div className={styles.infoContainer}>
				<h1 className={styles.name}>{creator.instagram}</h1>

				<div className={styles.info}>
					<b>based:</b> {creator.based || "—"}
				</div>
				<div className={styles.info}>
					<b>style:</b> {creator.style || "—"}
				</div>
			</div>
		</div>
	);
}
