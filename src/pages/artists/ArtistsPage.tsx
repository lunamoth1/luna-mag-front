import { JSX, useState } from "react";
import { useCreatorsStore } from "@/store/creatorsStore";
import ArtistButton from "@/components/artistButton/ArtistButton";
import SearchBar from "@/components/searchBar/SearchBar";
import FilterDropdown from "@/components/filterDropdown/FilterDropdown";
import styles from "./artistsPage.module.css";

export default function ArtistsPage(): JSX.Element {
	const creators = useCreatorsStore((s) => s.creators);

	const [search, setSearch] = useState("");
	const [selectedBased, setSelectedBased] = useState<string[]>([]);
	const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

	const filteredCreators = creators
		.filter((c) => !c.hide)
		.filter((c) => {
			const matchesSearch =
				!search || c.instagram?.toLowerCase().includes(search.toLowerCase());

			const matchesBased =
				selectedBased.length === 0 || selectedBased.includes(c.based);

			const matchesStyle =
				selectedStyles.length === 0 || selectedStyles.includes(c.style);

			return matchesSearch && matchesBased && matchesStyle;
		});

	const sortedCreators = filteredCreators.sort(
		(a, b) =>
			new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
	);

	const groupedCreators = [];
	for (let i = 0; i < sortedCreators.length; i += 2) {
		groupedCreators.push(sortedCreators.slice(i, i + 2));
	}

	return (
		<div className={styles.main}>
			<div className={styles.filterBar}>
				<SearchBar search={search} setSearch={setSearch} />
				<FilterDropdown
					creators={creators}
					onFiltersChange={(based, styles) => {
						setSelectedBased(based);
						setSelectedStyles(styles);
					}}
				/>
			</div>

			{groupedCreators.length > 0 ? (
				<div className={styles.artistsContainer}>
					{groupedCreators.map((pair, index) => (
						<div key={index} className={styles.row}>
							{pair.map((creator) => (
								<ArtistButton key={creator.documentId} creator={creator} />
							))}
						</div>
					))}
				</div>
			) : (
				<div className={styles.emptyState}>
					No artists were found based on the selected filters
				</div>
			)}
		</div>
	);
}
