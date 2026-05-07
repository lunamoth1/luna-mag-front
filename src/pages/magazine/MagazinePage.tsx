import { JSX } from "react";
import { useNewsStore } from "@/store/newsStore";
import HomeBanner from "@/components/homeBanner/HomeBanner";
import styles from "./magazinePage.module.css";

export default function MagazinePage(): JSX.Element {
	const { news } = useNewsStore();

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<HomeBanner />

				{news.length > 0 && (
					<ul className={styles.newsList}>
						{news.map((item) => (
							<li key={item.id} className={styles.newsItem}>
								<h3>{item.title}</h3>
								<p>{item.text}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
