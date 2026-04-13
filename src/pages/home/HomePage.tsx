import Marquee from '../../components/Marquee/Marquee';
import styles from './HomePage.module.css';
import { JSX } from 'react';

export default function HomePage(): JSX.Element {
  return (
    <div>
      <Marquee text="Добро пожаловать! Новые поступления каждый день🔥 Следите за обновлениями, скоро большие скидки!" speed="20s" />
      <div className={styles.container}>
        <h2>Главная страница</h2>
        <p>Основной контент сайта будет здесь.</p>
      </div>
    </div>
  );
}
