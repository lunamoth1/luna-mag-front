import { JSX } from "react";
import AdminCard from "@/components/adminCard/AdminCard";
import AdminHeader from "@/components/adminHeader/AdminHeader";
import { useAdminStore } from "@/store/adminStore";
import styles from "./adminPage.module.css";

export default function AdminPage(): JSX.Element {
	const { logout } = useAdminStore();

	return (
		<>
			<AdminHeader title="Панель администратора">
				<button onClick={logout} className="logout-btn-in-menu">
					Выйти
				</button>
			</AdminHeader>

			<div className={styles.container}>
				<div className={styles.menuList}>
					<AdminCard title="Бегущая строка" to="/admin/marquee" />
					<AdminCard title="Креаторы" to="/admin/creators" />
					<AdminCard title="Новости" to="/admin/news" />
					<AdminCard title="Блог" to="/admin/blog" />
				</div>
			</div>
		</>
	);
}
