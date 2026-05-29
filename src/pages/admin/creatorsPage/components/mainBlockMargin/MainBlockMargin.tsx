import { JSX } from "react";
import { CreatorImage } from "@/types/api/creator";
import styles from "./mainBlockMargin.module.css";

interface MainBlockMarginProps {
	worksPhotos: CreatorImage[];
	setWorksPhotos: (works: CreatorImage[]) => void;
	index: number;
}

export default function MainBlockMargin({
	worksPhotos,
	setWorksPhotos,
	index,
}: MainBlockMarginProps): JSX.Element {
	return (
		<div className={styles.container}>
			<div className={styles.topBlock}>
				<p className={styles.text}>Сверху</p>
				<input
					type="number"
					value={worksPhotos[index]?.marginTop ?? ""}
					onChange={(e) => {
						const newWorks = [...worksPhotos];
						newWorks[index] = {
							...(newWorks[index] || {}),
							marginTop: e.target.value ? parseInt(e.target.value) : undefined,
						} as any;
						setWorksPhotos(newWorks);
					}}
					className={styles.marginInput}
				/>
			</div>

			<div className={styles.middleBlock}>
				<div
				//  className={styles.leftBlock}
				>
					<p className={styles.text}>Слева</p>
					<input
						type="number"
						value={worksPhotos[index]?.marginLeft ?? ""}
						onChange={(e) => {
							const newWorks = [...worksPhotos];
							newWorks[index] = {
								...(newWorks[index] || {}),
								marginLeft: e.target.value
									? parseInt(e.target.value)
									: undefined,
							} as any;
							setWorksPhotos(newWorks);
						}}
						className={styles.marginInput}
					/>
				</div>

				<div
				//  className={styles.rightBlock}
				>
					<p className={styles.text}>Справа</p>
					<input
						type="number"
						value={worksPhotos[index]?.marginRight ?? ""}
						onChange={(e) => {
							const newWorks = [...worksPhotos];
							newWorks[index] = {
								...(newWorks[index] || {}),
								marginRight: e.target.value
									? parseInt(e.target.value)
									: undefined,
							} as any;
							setWorksPhotos(newWorks);
						}}
						className={styles.marginInput}
					/>
				</div>
			</div>

			<div className={styles.bottomBlock}>
				<p className={styles.text}>Снизу</p>
				<input
					type="number"
					value={worksPhotos[index]?.marginBottom ?? ""}
					onChange={(e) => {
						const newWorks = [...worksPhotos];
						newWorks[index] = {
							...(newWorks[index] || {}),
							marginBottom: e.target.value
								? parseInt(e.target.value)
								: undefined,
						} as any;
						setWorksPhotos(newWorks);
					}}
					className={styles.marginInput}
				/>
			</div>
		</div>
	);
}
