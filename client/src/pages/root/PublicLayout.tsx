import { Outlet } from 'react-router-dom';
import PublicNavigation from '../../components/public-navigation/PublicNavigation.tsx';

import classes from './PublicLayout.module.css';

const PublicLayout = () => {
  return (
    <>
      <PublicNavigation />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
