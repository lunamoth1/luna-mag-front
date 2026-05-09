import { JSX } from "react";
import { useBlogStore } from "@/store/blogStore";
import styles from "./blogPage.module.css";

export default function BlogPage(): JSX.Element {
	const { blogs } = useBlogStore();

	if (blogs.length === 0) {
		return <div className={styles.container}>Post will be available soon</div>;
	}

	return (
		<div>
			{blogs.length > 0 && (
				<div className={styles.blogList}>
					{blogs.map((blog) => (
						<div key={blog.documentId} className={styles.blogItem}>
							<p className={styles.blogTitle}>{blog.title}</p>
							<p className={styles.blogText}>{blog.text}</p>
							<div className={styles.blogDate}>
								{blog.createdAt && (
									<span>
										{new Date(blog.createdAt).toLocaleDateString("ru-RU")}
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
