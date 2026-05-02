import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MagazinePage from "./pages/magazine/MagazinePage";
import ArtistsPage from "./pages/artists/ArtistsPage";
import GalleriesPage from "./pages/galleries/GalleriesPage";
import PartnersPage from "./pages/partners/PartnersPage";
import EventsPage from "./pages/events/EventsPage";
import BlogPage from "./pages/blog/BlogPage";
import ContactsPage from "./pages/contacts/ContactsPage";

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
		<div className={isAdmin ? styles.adminContainer : styles.mainContainer}>
			{!isAdmin && <Header />}

			<div className={styles.contentContainer}>
				{!isAdmin && <SideNav />}

				<main className={styles.navigationContent}>
					<Routes>
						<Route path="/" element={<MagazinePage />} />
						<Route path="/artists" element={<ArtistsPage />} />
						<Route path="/galleries" element={<GalleriesPage />} />
						<Route path="/partners" element={<PartnersPage />} />
						<Route path="/events" element={<EventsPage />} />
						<Route path="/blog" element={<BlogPage />} />
						<Route path="/contacts" element={<ContactsPage />} />

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
