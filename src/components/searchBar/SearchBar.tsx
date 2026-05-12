import { JSX } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";
import styles from "./searchBar.module.css";

interface SearchBarProps {
	search: string;
	setSearch: (search: string) => void;
}

export default function SearchBar({
	search,
	setSearch,
}: SearchBarProps): JSX.Element {
	return (
		<div className={styles.search}>
			<div className={styles.searchLogo}>
				<SearchIcon />
			</div>

			<input
				type="text"
				placeholder="Search"
				className={styles.searchInput}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
}
