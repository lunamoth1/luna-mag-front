import { JSX } from "react";
import styles from "./newsPage.module.css";
import { useNewsStore } from "@/store/newsStore";
import NewsElement from "@/components/newsElement/NewsElement";

export default function NewsPage(): JSX.Element {
	const { news } = useNewsStore();

	return (
		<div className={styles.main}>
			{news.length > 0 && (
				<ul className={styles.newsList}>
					{news.map((item) => (
						<NewsElement key={item.id} news={item} />
					))}
				</ul>
			)}
		</div>
	);
}
