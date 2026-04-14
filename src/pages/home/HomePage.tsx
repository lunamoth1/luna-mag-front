import Marquee from '../../components/marquee/Marquee';
import styles from './homePage.module.css';
import { JSX } from 'react';

export default function HomePage(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {/* <h2>Главная страница</h2>
        <p>Основной контент сайта будет здесь.</p> */}
      </div>

      <div className={styles.marquee}>
        <Marquee speed="20s" />
      </div>

    </div>
  );
}
