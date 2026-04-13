import { JSX } from 'react';
import styles from './adminPage.module.css';
import AdminCard from '@/components/adminCard/AdminCard';
import AdminHeader from '@/components/adminHeader/AdminHeader';

export default function AdminPage(): JSX.Element {
  return (
    <>
      <AdminHeader title="Панель администратора" />

      <div className={styles.container}>
        <div className={styles.menuList}>
          <AdminCard
            title="Бегущая строка"
            to="/admin/marquee"
          />
        </div>
      </div>
    </>
  );
}
