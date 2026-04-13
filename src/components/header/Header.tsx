import { JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';

export default function Header(): JSX.Element | null {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Главная</Link>
        <Link to="/admin" className={styles.link}>Админка</Link>
      </nav>
    </header>
  );
}