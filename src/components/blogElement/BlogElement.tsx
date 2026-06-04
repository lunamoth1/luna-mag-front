import { JSX } from "react";
import { getImageUrl } from "@/utils/imageUrl";
import { BlogPost } from "@/types/api/blog";
import styles from "./blogElement.module.css";

interface BlogElementProps {
	blog: BlogPost;
}

export default function BlogElement({ blog }: BlogElementProps): JSX.Element {
	return (
		<div key={blog.documentId} className={styles.blogItem}>
			<p className={styles.blogTitle}>{blog.title}</p>
			<p className={styles.blogText}>{blog.text}</p>

			{blog.images && blog.images.length > 0 && (
				<div className={styles.imagesGrid}>
					{blog.images.map((image) => (
						<div key={image.id}>
							<img
								src={getImageUrl(image.url)}
								alt={image.description}
								className={styles.galleryImage}
							/>
							{image.description && (
								<p className={styles.imageDescription}>{image.description}</p>
							)}
						</div>
					))}
				</div>
			)}

			<div className={styles.blogDate}>
				{blog.createdAt && (
					<span>{new Date(blog.createdAt).toLocaleDateString("ru-RU")}</span>
				)}
			</div>
		</div>
	);
}
