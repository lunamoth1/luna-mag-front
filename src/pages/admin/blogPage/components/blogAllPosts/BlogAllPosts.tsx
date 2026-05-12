import { JSX } from "react";
import { getImageUrl } from "@/utils/imageUrl";
import { BlogPost } from "@/types/api/blog";
import styles from "./blogAllPosts.module.css";

interface BlogAllPostsProps {
	blogs: BlogPost[];
	handleEdit: (blogPost: BlogPost) => void;
	handleDelete: (documentId?: string) => void;
}

export default function BlogAllPosts({
	blogs,
	handleEdit,
	handleDelete,
}: BlogAllPostsProps): JSX.Element {
	return (
		<div className={styles.list}>
			<h2>Все посты</h2>
			{blogs.length === 0 ? (
				<div className={styles.emptyState}>Постов нет.</div>
			) : (
				blogs.map((blog) => (
					<div key={blog.documentId} className={styles.item}>
						<div>
							<h3 className={styles.itemTitle}>{blog.title}</h3>
							<p className={styles.itemText}>{blog.text}</p>

							{blog.images && blog.images.length > 0 && (
								<div className={styles.imagesPreview}>
									{blog.images.map((img) => (
										<div key={img.id} className={styles.thumbnailWrapper}>
											<img
												src={getImageUrl(img.url)}
												alt={img.description}
												className={styles.thumbnail}
											/>
											<p className={styles.imageDescription}>
												{img.description}
											</p>
										</div>
									))}
								</div>
							)}

							<div className={styles.itemDate}>
								{blog.createdAt && (
									<span>
										{new Date(blog.createdAt).toLocaleDateString("ru-RU")}
									</span>
								)}
							</div>
						</div>

						<div className={styles.itemActions}>
							<button
								onClick={() => handleEdit(blog)}
								className={styles.editButton}
							>
								Изменить
							</button>
							<button
								onClick={() => handleDelete(blog.documentId)}
								className={styles.deleteButton}
							>
								Удалить
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
}
