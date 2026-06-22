import { Outlet } from 'react-router-dom';
import MainNavigation from '../../components/main-navigation/MainNavigation.tsx';
import styles from './ProtectedLayout.module.css';

const ProtectedLayout = () => {
  return (
    <div className={styles.appShell}>
      <MainNavigation />

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
