import { JSX } from "react";
import { useNewsStore } from "@/store/newsStore";
import styles from "./homeBanner.module.css";

export default function HomeBanner(): JSX.Element {
	const news = useNewsStore((s) => s.news);
	const featuredNews = news.filter((item) => item.featured);

	return (
		<div className={styles.container}>
			<p className={styles.newsText}>news</p>

			<div>
				{featuredNews.map((item) => (
					<p key={item.id} className={styles.newsItem}>
						{item.title}
					</p>
				))}
			</div>
		</div>
	);
}
