import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCreatorsStore } from "@/store/creatorsStore";
import Loader from "@/components/loader/Loader";
import { getImageUrl } from "@/utils/imageUrl";
import { CreatorImage } from "@/types/api/creator";
import styles from "./artistPage.module.css";

export default function ArtistPage() {
	const { instagram } = useParams<{ instagram: string }>();

	const isStoreLoading = useCreatorsStore((s) => s.isLoading);
	const creator = useCreatorsStore((s) =>
		s.creators.find((c) => c.instagram === instagram),
	);

	const countedImages = useRef<Set<string | number>>(new Set());
	const [loadedImagesCount, setLoadedImagesCount] = useState(0);
	const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);

	useEffect(() => {
		setLoadedImagesCount(0);
		setIsMinTimeElapsed(false);
		countedImages.current.clear();

		const timer = setTimeout(() => setIsMinTimeElapsed(true), 200);
		return () => clearTimeout(timer);
	}, [instagram]);

	const totalImages = creator?.worksPhotos?.length || 0;
	const imagesLoaded = totalImages === 0 || loadedImagesCount >= totalImages;

	const isImagesLoading = Boolean(creator && !imagesLoaded);

	const isLoading = isStoreLoading || isImagesLoading || !isMinTimeElapsed;

	const imageMargin = (image: CreatorImage) => ({
		marginTop: image.marginTop ? `${image.marginTop}px` : undefined,
		marginRight: image.marginRight ? `${image.marginRight}px` : undefined,
		marginBottom: image.marginBottom ? `${image.marginBottom}px` : undefined,
		marginLeft: image.marginLeft ? `${image.marginLeft}px` : undefined,
	});

	const handleImageLoad = (
		e: React.SyntheticEvent<HTMLImageElement>,
		imgId: string | number,
	) => {
		if (countedImages.current.has(imgId)) return;

		countedImages.current.add(imgId);

		const target = e.currentTarget;
		if (target.naturalWidth > target.naturalHeight) {
			target.style.height = "300px";
			target.style.width = "auto";
		} else {
			target.style.width = "300px";
			target.style.height = "auto";
		}

		setLoadedImagesCount((prev) => prev + 1);
	};

	return (
		<>
			{isLoading && (
				<div className={styles.loaderContainer}>
					<Loader />
				</div>
			)}

			{!isLoading && !creator && (
				<div className={styles.notFound}>Author not found</div>
			)}

			{creator && (
				<div
					className={styles.container}
					style={{ display: isLoading ? "none" : "flex" }}
				>
					<div className={styles.worksList}>
						{creator.worksPhotos &&
							creator.worksPhotos.length > 0 &&
							creator.worksPhotos.map((img, i) => {
								const imgId = img.id || i;

								return (
									<img
										key={imgId}
										className={styles.workImg}
										src={getImageUrl(img.url)}
										alt={img.alternativeText || `work ${i + 1}`}
										style={imageMargin(img)}
										ref={(el) => {
											if (!el) return;

											if (el.complete && !countedImages.current.has(imgId)) {
												handleImageLoad(
													{
														currentTarget: el,
													} as React.SyntheticEvent<HTMLImageElement>,
													imgId,
												);
											} else if (!el.complete) {
												el.onload = () =>
													handleImageLoad(
														{
															currentTarget: el,
														} as unknown as React.SyntheticEvent<HTMLImageElement>,
														imgId,
													);
											}
										}}
									/>
								);
							})}
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
			)}
		</>
	);
}
