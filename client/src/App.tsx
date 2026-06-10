import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AccountPage from './pages/account/AccountPage.tsx';
import BugDetailPage from './pages/bugs/BugDetailPage.tsx';
import CreateBugPage from './pages/bugs/CreateBugPage.tsx';
import DashboardPage from './pages/dashboard/DashboardPage.tsx';
import LandingPage from './pages/landing/LandingPage.tsx';
import LoginPage from './pages/login/LoginPage.tsx';
import NotFoundPage from './pages/not-found/NotFoundPage.tsx';
import CreateProjectPage from './pages/projects/CreateProjectPage.tsx';
import ProjectDetailPage from './pages/projects/ProjectDetailPage.tsx';
import ProjectsPage from './pages/projects/ProjectsPage.tsx';
import ProtectedLayout from './pages/root/ProtectedLayout.tsx';
import PublicLayout from './pages/root/PublicLayout.tsx';
import RootLayout from './pages/root/RootLayout.tsx';
import SignupPage from './pages/signup/SignupPage.tsx';

function App() {
  return <RouterProvider router={router} />;
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: 'signup',
            element: <SignupPage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'projects',
            element: <ProjectsPage />,
          },
          {
            path: 'projects/new',
            element: <CreateProjectPage />,
          },
          {
            path: 'projects/:projectId',
            element: <ProjectDetailPage />,
          },
          {
            path: 'projects/:projectId/bugs/new',
            element: <CreateBugPage />,
          },
          {
            path: 'bugs/:bugId',
            element: <BugDetailPage />,
          },
          {
            path: 'account',
            element: <AccountPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default App;
