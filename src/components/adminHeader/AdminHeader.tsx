import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './adminHeader.module.css';

interface AdminHeaderProps {
  title: string;
  showBack?: boolean;
}

export default function AdminHeader({ title, showBack = false }: AdminHeaderProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack && (
          <button onClick={() => navigate(-1)} className={styles.backButton} aria-label="Назад">
            ←
          </button>
        )}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.right}>
        {/* Третья вещь, пустой блок, нужен для того чтобы flexbox идеально центрировал заголовок посредине */}
      </div>
    </header>
  );
}
