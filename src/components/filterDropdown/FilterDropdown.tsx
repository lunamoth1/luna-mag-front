import { JSX, useState, useEffect } from "react";
import { Creator } from "@/types/api/creator";
import styles from "./filterDropdown.module.css";

interface FilterDropdownProps {
	creators: Creator[];
	onFiltersChange: (basedFilters: string[], styleFilters: string[]) => void;
}

export default function FilterDropdown({
	creators,
	onFiltersChange,
}: FilterDropdownProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedBased, setSelectedBased] = useState<string[]>([]);
	const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

	const uniqueBased = Array.from(
		new Set(creators.filter((c) => !c.hide && c.based).map((c) => c.based)),
	).sort();

	const uniqueStyles = Array.from(
		new Set(creators.filter((c) => !c.hide && c.style).map((c) => c.style)),
	).sort();

	useEffect(() => {
		onFiltersChange(selectedBased, selectedStyles);
	}, [selectedBased, selectedStyles, onFiltersChange]);

	const handleBasedToggle = (based: string) => {
		setSelectedBased((prev) =>
			prev.includes(based) ? prev.filter((b) => b !== based) : [...prev, based],
		);
	};

	const handleStyleToggle = (style: string) => {
		setSelectedStyles((prev) =>
			prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
		);
	};

	const handleClearFilters = () => {
		setSelectedBased([]);
		setSelectedStyles([]);
	};

	const hasActiveFilters =
		selectedBased.length > 0 || selectedStyles.length > 0;

	return (
		<div className={styles.container}>
			<button
				className={`${styles.filterButton} ${hasActiveFilters ? styles.active : ""}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className={styles.filterText}>Filter</span>
				{hasActiveFilters && (
					<span className={styles.badge}>
						{selectedBased.length + selectedStyles.length}
					</span>
				)}
			</button>

			{isOpen && (
				<div className={styles.dropdown}>
					<div className={styles.filterSection}>
						<h3>Based</h3>
						<div className={styles.filterOptions}>
							{uniqueBased.length > 0 ? (
								uniqueBased.map((based) => (
									<label key={based} className={styles.filterLabel}>
										<input
											type="checkbox"
											checked={selectedBased.includes(based)}
											onChange={() => handleBasedToggle(based)}
										/>
										<span>{based}</span>
									</label>
								))
							) : (
								<p className={styles.emptyText}>No data</p>
							)}
						</div>
					</div>

					<div className={styles.filterSection}>
						<h3>Style</h3>
						<div className={styles.filterOptions}>
							{uniqueStyles.length > 0 ? (
								uniqueStyles.map((style) => (
									<label key={style} className={styles.filterLabel}>
										<input
											type="checkbox"
											checked={selectedStyles.includes(style)}
											onChange={() => handleStyleToggle(style)}
										/>
										<span>{style}</span>
									</label>
								))
							) : (
								<p className={styles.emptyText}>No data</p>
							)}
						</div>
					</div>

					{hasActiveFilters && (
						<button className={styles.clearButton} onClick={handleClearFilters}>
							Clear Filters
						</button>
					)}
				</div>
			)}
		</div>
	);
}
