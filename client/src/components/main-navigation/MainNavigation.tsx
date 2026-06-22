import { NavLink, useNavigate } from 'react-router-dom';

import styles from './MainNavigation.module.css';

const MainNavigation = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label='Main navigation'>
        <NavLink className={styles.logo} to='/dashboard'>
          Bug-Board
        </NavLink>

        <ul className={styles.list}>
          <li>
            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/projects'
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Projects
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/bugs'
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Bugs
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/account'
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Account
            </NavLink>
          </li>

          <li>
            <button className={styles.logoutButton} type='button' onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
