import { useEffect, useState } from 'react';
import Marquee from '../../components/marquee/Marquee';
import { fetchCreators, Creator } from '../../api/creator';
import styles from './homePage.module.css';
import { JSX } from 'react';

export default function HomePage(): JSX.Element {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    fetchCreators().then(setCreators);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {creators.length > 0 && (
            creators.map((c) => (
              <li className={styles.listItem} key={c.id}>
                <strong>{c.name}</strong>
                <p>{c.Bio}</p>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className={styles.marquee}>
        <Marquee speed="20s" />
      </div>

    </div>
  );
}
