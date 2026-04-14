import { JSX, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './adminHeader.module.css';

interface AdminHeaderProps {
  title: string;
  showBack?: boolean;
  children?: ReactNode;
}

export default function AdminHeader({ title, showBack = false, children }: AdminHeaderProps): JSX.Element {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {showBack && (
            <button onClick={() => navigate(-1)} className={styles.backButton} aria-label="Назад">
              ←
            </button>
          )}
        </div>

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.right}>
          {children && (
            <>
              <button
                className={styles.burger}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Меню"
              >
                <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
                <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
                <div className={`${styles.line} ${isMenuOpen ? styles.open : ''}`}></div>
              </button>

              {isMenuOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.menuItems} onClick={() => setIsMenuOpen(false)}>
                    {children}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
