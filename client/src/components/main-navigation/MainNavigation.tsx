import { Link } from 'react-router-dom';

import classes from './MainNaviation.module.css';

const MainNavigation = () => {
  function handleLogout() {
    localStorage.removeItem('token');
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/projects'>Projects</Link>
          </li>
          <li>
            <Link to='/bugs'>Bugs</Link>
          </li>
          <li>
            <Link to='/account'>Account</Link>
          </li>
          <li onClick={handleLogout}>
            <Link to='/'>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
