import { JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./newsElement.module.css";
import { NewsItem } from "@/types/api/news";

interface NewsElementProps {
	news: NewsItem;
}

export default function NewsElement({ news }: NewsElementProps): JSX.Element {
	return (
		<div className={styles.container}>
			<li className={styles.newsItem}>
				<Link
					to={`/news/${encodeURIComponent(news.title)}`}
					className={styles.newsLink}
				>
					<h3>{news.title}</h3>
					<p>{news.text}</p>
				</Link>
			</li>
		</div>
	);
}
