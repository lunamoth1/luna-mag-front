import { Link } from 'react-router-dom';
import styles from './adminCard.module.css';
import { JSX } from 'react';

interface AdminCardProps {
  title: string;
  to: string;
}

export default function AdminCard({ title, to }: AdminCardProps): JSX.Element {
  return (
    <Link to={to} className={styles.card}>
      <h3>{title}</h3>
      <span className={styles.arrow}>→</span>
    </Link>
  );
}
