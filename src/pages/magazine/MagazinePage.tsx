import { JSX } from "react";
import { useNewsStore } from "@/store/newsStore";
import HomeBanner from "@/components/homeBanner/HomeBanner";
import NewsElement from "@/components/newsElement/NewsElement";
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
							<NewsElement key={item.id} news={item} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
