import { JSX } from "react";
import { useBlogStore } from "@/store/blogStore";
import BlogElement from "@/components/blogElement/BlogElement";
import styles from "./blogPage.module.css";

export default function BlogPage(): JSX.Element {
	const { blogs } = useBlogStore();

	if (blogs.length === 0) {
		return <div className={styles.main}>Post will be available soon</div>;
	}

	return (
		<div className={styles.main}>
			{blogs.length > 0 && (
				<div className={styles.blogList}>
					{blogs.map((blog) => (
						<BlogElement key={blog.documentId} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
}
