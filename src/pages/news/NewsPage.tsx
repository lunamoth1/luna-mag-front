import { JSX } from "react";
import { useNewsStore } from "@/store/newsStore";
import { useMinDelay } from "@/hooks/useMinDelay";
import Loader from "@/components/loader/Loader";
import NewsElement from "@/components/newsElement/NewsElement";
import styles from "./newsPage.module.css";

export default function NewsPage(): JSX.Element {
	const { news, isLoading: isStoreLoading } = useNewsStore();

	const isReady = useMinDelay(isStoreLoading, 200);

	if (!isReady) {
		return (
			<div className={styles.loaderContainer}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles.main}>
			{news.length > 0 ? (
				<ul className={styles.newsList}>
					{news.map((item) => (
						<NewsElement key={item.id} news={item} />
					))}
				</ul>
			) : (
				<p className={styles.noNews}>No news available</p>
			)}
		</div>
	);
}
