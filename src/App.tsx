import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import AdminPage from './pages/admin/mainPage/AdminPage';
import MarqueeAdminPage from './pages/admin/marqueePage/MarqueeAdminPage';

import Header from './components/header/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/marquee" element={<MarqueeAdminPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
