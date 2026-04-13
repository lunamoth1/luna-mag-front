import { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Главная</Link>
        <Link to="/admin" className={styles.link}>Админка</Link>
      </nav>
    </header>
  );
}