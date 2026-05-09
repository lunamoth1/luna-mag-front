import { JSX } from "react";
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
						<div className={styles.itemInfo}>
							<h3>{blog.title}</h3>
							<p>{blog.text}</p>
							<div
								style={{
									marginTop: "0.5rem",
									fontSize: "0.85rem",
									color: "#999",
								}}
							>
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
