import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import WinButton from '../winButton/WinButton';
import styles from './sideNav.module.css';

const NAV_LINKS = [
  { name: 'magazine', path: '/' },
  { name: 'artists', path: '/artists' },
  { name: 'galleries', path: '/galleries' },
  { name: 'partners', path: '/partners' },
  { name: 'events', path: '/events' },
  { name: 'blog', path: '/blog' },
  { name: 'contacts', path: '/contacts' },
];

export default function SideNav(): JSX.Element {
  const navigate = useNavigate();

  return (
    <nav className={styles.sideNav}>
      <ul className={styles.navList}>
        {NAV_LINKS.map((link) => (
          <li key={link.name} className={styles.navItem}>
            <WinButton onClick={() => navigate(link.path)} label={link.name} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
