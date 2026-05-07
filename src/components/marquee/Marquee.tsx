import { useMarqueeStore } from "@/store/marqueeStore";
import styles from "./marquee.module.css";

export default function Marquee({ speed = "15s" }: { speed?: string }) {
	const { marquee } = useMarqueeStore();

	const displayText = marquee.map((item) => item.text).join("    /    ");

	if (!displayText) return null;

	return (
		<div className={styles.marqueeWrapper}>
			<div className={styles.marqueeTrack} style={{ animationDuration: speed }}>
				<span className={styles.marqueeText}>{displayText}</span>
			</div>
		</div>
	);
}
