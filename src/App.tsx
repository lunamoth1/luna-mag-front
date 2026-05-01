import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import AdminPage from "./pages/admin/mainPage/AdminPage";
import MarqueeAdminPage from "./pages/admin/marqueePage/MarqueeAdminPage";
import CreatorsAdminPage from "./pages/admin/creatorsPage/CreatorsAdminPage";
import PinLogin from "./pages/admin/login/PinLogin";

import SideNav from "./components/sideNav/SideNav";
import Header from "./components/header/Header";
import styles from "./styles/app.module.css";
import { useAdminStore } from "./store/adminStore";

function AppLayout() {
	const location = useLocation();
	const isAdmin = location.pathname.startsWith("/admin");
	const { isAuthenticated } = useAdminStore();

	const showPinLogin = isAdmin && !isAuthenticated;

	if (showPinLogin) {
		return <PinLogin />;
	}

	return (
		<div className={styles.mainContainer}>
			{!isAdmin && <Header />}

			<div className={styles.contentContainer}>
				{!isAdmin && <SideNav />}

				<main className={styles.navigationContent}>
					<Routes>
						<Route path="/" element={<HomePage />} />

						<Route path="/admin" element={<AdminPage />} />
						<Route path="/admin/marquee" element={<MarqueeAdminPage />} />
						<Route path="/admin/creators" element={<CreatorsAdminPage />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppLayout />
		</BrowserRouter>
	);
}
