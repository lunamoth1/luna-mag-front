import { Link } from 'react-router-dom';
import styles from './sideNav.module.css';
import { JSX } from 'react';

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
  return (
    <nav className={styles.sideNav}>
      <ul className={styles.navList}>
        {NAV_LINKS.map((link) => (
          <li key={link.name} className={styles.navItem}>
            <Link to={link.path} className={styles.navLink}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
