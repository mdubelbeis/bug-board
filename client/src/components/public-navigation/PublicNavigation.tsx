import { NavLink } from 'react-router-dom';

import styles from './PublicNavigation.module.css';

const PublicNavigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label='Public navigation'>
        <NavLink className={styles.logo} to='/'>
          Bug-Board
        </NavLink>

        <ul className={styles.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              end
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/signup'
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Sign up
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? `${styles.loginLink} ${styles.active}` : styles.loginLink
              }
            >
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PublicNavigation;
