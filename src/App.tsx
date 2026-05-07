import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import MagazinePage from "./pages/magazine/MagazinePage";
import ArtistsPage from "./pages/artists/ArtistsPage";
import ArtistPage from "./pages/artist/ArtistPage";
import GalleriesPage from "./pages/galleries/GalleriesPage";
import PartnersPage from "./pages/partners/PartnersPage";
import EventsPage from "./pages/events/EventsPage";
import BlogPage from "./pages/blog/BlogPage";
import ContactsPage from "./pages/contacts/ContactsPage";

import PinLogin from "./pages/admin/login/PinLogin";
import AdminPage from "./pages/admin/mainPage/AdminPage";
import MarqueeAdminPage from "./pages/admin/marqueePage/MarqueeAdminPage";
import CreatorsAdminPage from "./pages/admin/creatorsPage/CreatorsAdminPage";
import NewsAdminPage from "./pages/admin/newsPage/NewsAdminPage";

import SideNav from "./components/sideNav/SideNav";
import Marquee from "./components/marquee/Marquee";
import Header from "./components/header/Header";

import { fetchNews } from "./api/news";
import { fetchMarquee } from "./api/marquee";
import { fetchCreators } from "./api/creator";
import { useNewsStore } from "./store/newsStore";
import { useAdminStore } from "./store/adminStore";
import { useMarqueeStore } from "./store/marqueeStore";
import { useCreatorsStore } from "./store/creatorsStore";

import styles from "./styles/app.module.css";

function AppLayout() {
	const location = useLocation();
	const isAdmin = location.pathname.startsWith("/admin");
	const { isAuthenticated } = useAdminStore();

	const setNews = useNewsStore((s) => s.setNews);
	const setMarquee = useMarqueeStore((s) => s.setMarquee);
	const setCreators = useCreatorsStore((s) => s.setCreators);

	useEffect(() => {
		fetchNews().then(setNews);
		fetchMarquee().then(setMarquee);
		fetchCreators().then(setCreators);
	}, [setCreators, setMarquee, setNews]);

	const showPinLogin = isAdmin && !isAuthenticated;

	if (showPinLogin) {
		return <PinLogin />;
	}

	return (
		<div className={isAdmin ? styles.adminContainer : styles.mainContainer}>
			{!isAdmin && <Header />}

			<div className={styles.contentContainer}>
				{!isAdmin && <SideNav />}

				{!isAdmin && (
					<div className={styles.marquee}>
						<Marquee speed="20s" />
					</div>
				)}

				<main className={styles.navigationContent}>
					<Routes>
						<Route path="/" element={<MagazinePage />} />
						<Route path="/artists" element={<ArtistsPage />} />
						<Route path="/artist/:instagram" element={<ArtistPage />} />
						<Route path="/galleries" element={<GalleriesPage />} />
						<Route path="/partners" element={<PartnersPage />} />
						<Route path="/events" element={<EventsPage />} />
						<Route path="/blog" element={<BlogPage />} />
						<Route path="/contacts" element={<ContactsPage />} />

						<Route path="/admin" element={<AdminPage />} />
						<Route path="/admin/marquee" element={<MarqueeAdminPage />} />
						<Route path="/admin/creators" element={<CreatorsAdminPage />} />
						<Route path="/admin/news" element={<NewsAdminPage />} />
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
