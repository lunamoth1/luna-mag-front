import { JSX } from 'react';
import styles from './AdminPage.module.css';

export default function AdminPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <h2>Панель администратора</h2>
    </div>
  );
}
