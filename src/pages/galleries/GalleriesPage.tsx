import { JSX } from "react";
import { useGalleryStore } from "@/store/galleryStore";
import { getImageUrl } from "@/utils/imageUrl";
import styles from "./galleriesPage.module.css";

export default function GalleriesPage(): JSX.Element {
	const { galleries } = useGalleryStore();

	return (
		<div className={styles.main}>
			{galleries.map((gallery) => (
				<div key={gallery.documentId} className={styles.galleryItem}>
					<img
						src={getImageUrl(gallery.image.url)}
						alt={gallery.image.url}
						className={styles.galleryImage}
					/>

					<div className={styles.linkButtonContainer}>
						<a
							href={gallery.link}
							className={styles.linkButton}
							target="_blank"
							rel="noopener noreferrer"
						>
							Buy
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
