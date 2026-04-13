import styles from './Marquee.module.css';

export default function Marquee({ text, speed = '15s' }: { text: string, speed?: string }) {
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeTrack} style={{ animationDuration: speed }}>
        <span className={styles.marqueeText}>{text}</span>
      </div>
    </div>
  );
}
