import { JSX, useState } from "react";
import styles from "./homeBanner.module.css";

export default function HomeBanner(): JSX.Element {
	const [news, setNews] = useState<string[]>([
		"Session update 05.05.2026 is going to be at New York City at Studio 55.",
		"Interview with Parra Guerra Peru vs US.",
		"news 3",
		"news 4",
	]);

	return (
		<div className={styles.container}>
			<p className={styles.newsText}>news</p>

			<div>
				{news.map((item, index) => (
					<p key={index} className={styles.newsItem}>
						{item}
					</p>
				))}
			</div>
		</div>
	);
}
