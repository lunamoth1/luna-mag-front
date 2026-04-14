import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import AdminPage from './pages/admin/mainPage/AdminPage';
import MarqueeAdminPage from './pages/admin/marqueePage/MarqueeAdminPage';
import PinLogin from './pages/admin/login/PinLogin';

import SideNav from './components/sideNav/SideNav';
import styles from './app.module.css';
import { useAdminStore } from './store/adminStore';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { isAuthenticated } = useAdminStore();

  const showPinLogin = isAdmin && !isAuthenticated;

  if (showPinLogin) {
    return <PinLogin />;
  }

  return (
    <div className={styles.appWrapper}>
      {!isAdmin && <SideNav />}

      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/marquee" element={<MarqueeAdminPage />} />
        </Routes>
      </main>
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
