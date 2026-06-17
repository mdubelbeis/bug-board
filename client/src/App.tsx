import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import { getCurrentUser } from './api/auth.ts';
import { getBugData, getBugsData } from './api/bugs.ts';
import { getProjectData, getProjectsData } from './api/projects.ts';
import AccountPage from './pages/account/AccountPage.tsx';
import BugDetailPage from './pages/bugs/BugDetailPage.tsx';
import BugsPage from './pages/bugs/BugsPage.tsx';
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

// TODO: In loader (try/catch) when your API error includes status

// if (err.status === 401) {
//   localStorage.removeItem('token');
//   return redirect('/login');
// }

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
            loader: async () => {
              const token = localStorage.getItem('token');

              if (!token) {
                return redirect('/login');
              }

              const projectsData = await getProjectsData(token);
              const bugsData = await getBugsData(token);

              const results = {
                projects: projectsData.data.projects,
                bugs: bugsData.data.bugs,
              };
              return results;
            },
          },
          {
            path: 'projects',
            element: <ProjectsPage />,
            loader: async () => {
              const token = localStorage.getItem('token');

              if (!token) {
                return redirect('/login');
              }

              const projectsData = await getProjectsData(token);

              return {
                projects: projectsData.data.projects,
                projectsCount: projectsData.count,
              };
            },
          },
          {
            path: 'projects/:projectId',
            element: <ProjectDetailPage />,
            loader: async ({ params }) => {
              const token = localStorage.getItem('token');
              const { projectId } = params;
              if (!token) {
                return redirect('/login');
              }

              if (!projectId) {
                throw new Error('Project ID is required');
              }

              const projectsData = await getProjectData(token, projectId);

              return projectsData.data.project;
            },
          },
          {
            path: 'bugs',
            element: <BugsPage />,
            loader: async () => {
              const token = localStorage.getItem('token');

              if (!token) {
                return redirect('/login');
              }

              const bugsData = await getBugsData(token);

              const result = {
                bugs: bugsData.data.bugs,
                bugsCount: bugsData.count,
              };

              return result;
            },
          },
          {
            path: 'bugs/:bugId',
            element: <BugDetailPage />,
            loader: async ({ params }) => {
              const token = localStorage.getItem('token');

              const { bugId } = params;

              if (!token) {
                return redirect('/login');
              }

              if (!bugId) {
                throw new Error('Bug ID is required');
              }

              const bugDetails = await getBugData(token, bugId);

              return bugDetails.data.bug;
            },
          },
          {
            path: 'account',
            element: <AccountPage />,
            loader: async () => {
              const token = localStorage.getItem('token');

              if (!token) {
                return redirect('/login');
              }

              const auth = await getCurrentUser(token);

              return auth.data.user;
            },
          },
          {
            path: 'projects/new',
            element: <CreateProjectPage />,
            loader: async () => {
              const token = localStorage.getItem('token');

              if (!token) {
                return redirect('/login');
              }
              return token;
            },
          },
          {
            path: 'projects/:projectId/bugs/new',
            element: <CreateBugPage />,
            loader: async ({ params }) => {
              const token = localStorage.getItem('token');
              const { projectId } = params;

              if (!token) {
                return redirect('/login');
              }

              if (!projectId) {
                throw new Error('Bug ID is required');
              }

              return { token, projectId };
            },
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
