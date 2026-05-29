import { useParams } from "react-router-dom";
import { useCreatorsStore } from "@/store/creatorsStore";
import { getImageUrl } from "@/utils/imageUrl";
import styles from "./artistPage.module.css";
import { CreatorImage } from "@/types/api/creator";

export default function ArtistPage() {
	const { instagram } = useParams<{ instagram: string }>();
	const creator = useCreatorsStore((s) =>
		s.creators.find((c) => c.instagram === instagram),
	);

	const imageMargin = (image: CreatorImage) => {
		return {
			marginTop: image.marginTop ? `${image.marginTop}px` : undefined,
			marginRight: image.marginRight ? `${image.marginRight}px` : undefined,
			marginBottom: image.marginBottom ? `${image.marginBottom}px` : undefined,
			marginLeft: image.marginLeft ? `${image.marginLeft}px` : undefined,
		};
	};

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
							src={getImageUrl(img.url)}
							alt={img.alternativeText || `work ${i + 1}`}
							onLoad={(e) => {
								const target = e.currentTarget;

								if (target.naturalWidth > target.naturalHeight) {
									target.style.height = "300px";
									target.style.width = "auto";
								} else {
									target.style.width = "300px";
									target.style.height = "auto";
								}
							}}
							style={imageMargin(img)}
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
