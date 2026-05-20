import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import MagazinePage from "./pages/magazine/MagazinePage";
import NewsDetailPage from "./pages/news/NewsDetailPage";
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
import BlogAdminPage from "./pages/admin/blogPage/BlogAdminPage";
import PartnersAdminPage from "./pages/admin/partnersPage/PartnersAdminPage";

import SideNav from "./components/sideNav/SideNav";
import Marquee from "./components/marquee/Marquee";
import Header from "./components/header/Header";

import { fetchNews } from "./api/news";
import { fetchBlogs } from "./api/blog";
import { fetchMarquee } from "./api/marquee";
import { fetchCreators } from "./api/creator";
import { fetchPartners } from "./api/partner";
import { useNewsStore } from "./store/newsStore";
import { useBlogStore } from "./store/blogStore";
import { useAdminStore } from "./store/adminStore";
import { useMarqueeStore } from "./store/marqueeStore";
import { useCreatorsStore } from "./store/creatorsStore";
import { usePartnerStore } from "./store/partnerStore";

import styles from "./styles/app.module.css";

function AppLayout() {
	const location = useLocation();
	const isAdmin = location.pathname.startsWith("/admin");
	const { isAuthenticated } = useAdminStore();

	const setNews = useNewsStore((s) => s.setNews);
	const setMarquee = useMarqueeStore((s) => s.setMarquee);
	const setCreators = useCreatorsStore((s) => s.setCreators);
	const setBlogs = useBlogStore((s) => s.setBlogs);
	const setPartners = usePartnerStore((s) => s.setPartners);

	useEffect(() => {
		fetchNews().then(setNews);
		fetchMarquee().then(setMarquee);
		fetchCreators().then(setCreators);
		fetchBlogs().then(setBlogs);
		fetchPartners().then(setPartners);
	}, [setCreators, setMarquee, setNews, setBlogs, setPartners]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

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
						<Route path="/news/:title" element={<NewsDetailPage />} />
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
						<Route path="/admin/news" element={<NewsAdminPage />} />{" "}
						<Route path="/admin/blog" element={<BlogAdminPage />} />{" "}					<Route path="/admin/partners" element={<PartnersAdminPage />} />					</Routes>
				</main>
			</div>

			{!isAdmin && (
				<div className={styles.marquee}>
					<Marquee speed="20s" />
				</div>
			)}
		</div>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<Analytics />
			<AppLayout />
		</BrowserRouter>
	);
}
