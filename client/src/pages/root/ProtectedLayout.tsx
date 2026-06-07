import { Outlet } from 'react-router-dom';
import MainNavigation from '../../components/main-navigation/MainNavigation.tsx';

const ProtectedLayout = () => {
  return (
    <div className='app-shell'>
      {/* <Sidebar /> */}
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
