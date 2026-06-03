import { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNewsStore } from "@/store/newsStore";
import { useMinDelay } from "@/hooks/useMinDelay";
import Loader from "@/components/loader/Loader";
import styles from "./homeBanner.module.css";

export default function HomeBanner(): JSX.Element {
	const navigate = useNavigate();

	const news = useNewsStore((s) => s.news);
	const isStoreLoading = useNewsStore((s) => s.isLoading);
	const isDelayElapsed = useMinDelay(isStoreLoading, 200);

	const isLoading = isStoreLoading || !isDelayElapsed;

	const featuredNews = news.filter((item) => item.featured);

	const handleBannerClick = () => navigate("/news");

	return (
		<div
			className={styles.container}
			onClick={handleBannerClick}
			style={{ cursor: "pointer" }}
		>
			{isLoading ? (
				<Loader color="black" />
			) : (
				<>
					<p className={styles.newsText}>news</p>

					<div>
						{featuredNews.map((item) => (
							<Link
								key={item.id}
								to={`/news/${encodeURIComponent(item.title)}`}
								className={styles.newsItem}
								onClick={(e) => e.stopPropagation()}
							>
								{item.title}
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
}
