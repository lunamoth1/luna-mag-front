import { useState, useEffect } from 'react';
import styles from './marquee.module.css';
import { fetchMarquee } from '@/api/marquee';

export default function Marquee({ speed = '15s', text: propText }: { speed?: string, text?: string }) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    fetchMarquee()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data);
        }
      })
      .catch((err) => {
        console.error('Error in Marquee effect:', err);
      });
  }, []);

  const displayText = messages.length > 0 ? messages.join('    /    ') : propText;

  if (!displayText) return null;

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeTrack} style={{ animationDuration: speed }}>
        <span className={styles.marqueeText}>{displayText}</span>
      </div>
    </div>
  );
}
