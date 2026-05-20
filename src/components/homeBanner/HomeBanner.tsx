import { JSX } from "react";
import { Link } from "react-router-dom";
import { useNewsStore } from "@/store/newsStore";
import styles from "./homeBanner.module.css";

export default function HomeBanner(): JSX.Element {
	const news = useNewsStore((s) => s.news);
	const featuredNews = news.filter((item) => item.featured);

	return (
		<Link to={"/news"} className={styles.container}>
			<p className={styles.newsText}>news</p>

			<div>
				{featuredNews.map((item) => (
					<Link
						key={item.id}
						to={`/news/${encodeURIComponent(item.title)}`}
						className={styles.newsItem}
					>
						{item.title}
					</Link>
				))}
			</div>
		</Link>
	);
}
