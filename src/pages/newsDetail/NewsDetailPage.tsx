import { JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNewsStore } from "@/store/newsStore";
import styles from "./newsDetailPage.module.css";

export default function NewsDetailPage(): JSX.Element {
	const { title } = useParams<{ title: string }>();
	const { news } = useNewsStore();
	const navigate = useNavigate();

	const decodedTitle = title ? decodeURIComponent(title) : "";
	const newsItem = news.find((item) => item.title === decodedTitle);

	if (!newsItem) {
		return (
			<div className={styles.main}>
				<div className={styles.container}>
					<div className={styles.notFound}>
						<button onClick={() => navigate("/")} className={styles.backButton}>
							← Back to Home
						</button>
						<h2>News Not Found</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<article className={styles.newsDetail}>
					<div className={styles.newsHeader}>
						<button onClick={() => navigate("/")} className={styles.backButton}>
							← Back to Home
						</button>
					</div>

					<h1 className={styles.newsTitle}>{newsItem.title}</h1>
					<p className={styles.newsText}>{newsItem.text}</p>
				</article>
			</div>
		</div>
	);
}
