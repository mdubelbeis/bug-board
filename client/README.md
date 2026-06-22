# Bug-Board Client

The Bug-Board client is the React frontend for the Bug-Board full-stack bug tracking application.

It is built with React, Vite, TypeScript, React Router, CSS Modules, and pnpm.

The frontend is deployed on Vercel and connects to the deployed Bug-Board Express API on Render.

---

## Live Client

Deployed frontend:

```txt
https://bug-board-gilt.vercel.app
```

Deployed API:

```txt
https://bug-board.onrender.com
```

API base URL used by the client:

```txt
https://bug-board.onrender.com/api/v1
```

---

## Demo Accounts

The deployed app includes demo accounts for testing authentication, protected routes, project ownership, and bug workflows.

### Demo User

```txt
Email: demo@bugboard.dev
Password: password123
```

### Second User

```txt
Email: second@bugboard.dev
Password: password123
```

The second user is included to test resource ownership boundaries. Users should only be able to access their own projects, bugs, and related data.

---

## Client Goal

Build a clean frontend for managing projects, bugs, comments, and authenticated user account flows.

The client provides:

- Public landing page
- Signup and login pages
- Protected app routes
- Dashboard page
- Project list page
- Project detail page
- Create project page
- Global bug list page
- Bug detail page
- Create bug page
- Account/profile page
- Not found page
- Initial responsive styling with CSS Modules

---

## Tech Stack

- React
- Vite
- TypeScript
- React Router
- CSS Modules
- pnpm
- Vercel

---

## Current Status

Completed so far:

- Vite React project setup
- TypeScript frontend setup
- React Router route configuration
- Public layout
- Protected layout
- Root layout
- Public navigation
- Main authenticated navigation
- Landing page
- Signup page
- Login page
- Dashboard page
- Projects page
- Project detail page
- Create project page
- Bugs page
- Bug detail page
- Create bug page
- Account page
- Not found page
- CSS Modules styling for core pages
- Frontend API environment variable setup
- Login/signup connected to deployed API
- JWT stored in local storage
- Protected routes using React Router loaders
- Project and bug data loading through protected API requests
- Create project workflow
- Create bug workflow
- Frontend deployed to Vercel
- Vercel SPA rewrite configuration for React Router routes

Current frontend focus:

- UI polish
- Error/loading states
- Better form validation feedback
- Comments integration on bug detail pages
- Profile update and password update workflows
- Project-specific bug summaries
- Better invalid/expired token handling

---

## Project Structure

Current page structure:

```txt
src/
  api/
    auth.ts
    bugs.ts
    projects.ts

  components/
    main-navigation/
      MainNavigation.tsx
      MainNavigation.module.css

    public-navigation/
      PublicNavigation.tsx
      PublicNavigation.module.css

  pages/
    account/
      AccountPage.tsx
      AccountPage.module.css

    bugs/
      BugsPage.tsx
      BugsPage.module.css
      BugDetailPage.tsx
      BugDetailPage.module.css
      CreateBugPage.tsx
      CreateBugPage.module.css

    dashboard/
      DashboardPage.tsx
      DashboardPage.module.css

    landing/
      LandingPage.tsx
      LandingPage.module.css

    login/
      LoginPage.tsx
      LoginPage.module.css

    not-found/
      NotFoundPage.tsx
      NotFoundPage.module.css

    projects/
      ProjectsPage.tsx
      ProjectsPage.module.css
      ProjectDetailPage.tsx
      ProjectDetailPage.module.css
      CreateProjectPage.tsx
      CreateProjectPage.module.css

    root/
      RootLayout.tsx
      PublicLayout.tsx
      PublicLayout.module.css
      ProtectedLayout.tsx
      ProtectedLayout.module.css

    signup/
      SignupPage.tsx
      SignupPage.module.css

  types/
    auth.ts
    bug.ts
    dashboard.ts
    project.ts

  App.tsx
  main.tsx
```

---

## Routes

```txt
/                              Landing page
/login                         Login page
/signup                        Signup page

/dashboard                     Dashboard
/projects                      Projects list
/projects/new                  Create project
/projects/:projectId           Project details
/projects/:projectId/bugs/new  Create bug
/bugs                          Global bugs list
/bugs/:bugId                   Bug details

/account                       Account page
*                              Not found page
```

---

## Layout Structure

The app uses route layouts to separate public pages from authenticated app pages.

```txt
RootLayout
  PublicLayout
    LandingPage
    LoginPage
    SignupPage

  ProtectedLayout
    DashboardPage
    ProjectsPage
    CreateProjectPage
    ProjectDetailPage
    BugsPage
    BugDetailPage
    CreateBugPage
    AccountPage

  NotFoundPage
```

### RootLayout

Top-level route wrapper for the app.

Current role:

- Provides a shared parent route for public and protected layouts
- Gives the app a place for future global behavior

Future use cases:

- Global error boundary
- Toast notifications
- Scroll restoration
- Global app providers

### PublicLayout

Used for unauthenticated pages.

Includes:

- Public navigation
- Public page content wrapper

Pages:

```txt
/
 /login
 /signup
```

### ProtectedLayout

Used for authenticated app pages.

Includes:

- Main authenticated navigation
- Protected page content wrapper

Pages:

```txt
/dashboard
/projects
/projects/new
/projects/:projectId
/projects/:projectId/bugs/new
/bugs
/bugs/:bugId
/account
```

---

## Authentication Flow

The backend supports:

```txt
POST  /api/v1/auth/signup
POST  /api/v1/auth/login
GET   /api/v1/auth/me
PATCH /api/v1/auth/me
PATCH /api/v1/auth/update-password
```

Frontend auth flow:

```txt
signup/login
  -> receive token
  -> store token in localStorage
  -> redirect to dashboard
  -> use token for protected API requests
```

Protected API requests require:

```txt
Authorization: Bearer <token>
```

Current token storage:

```txt
localStorage
```

Future improvement:

```txt
Secure, HttpOnly cookies
```

---

## Protected Routes

Protected app routes use React Router loaders.

Current protected route flow:

```txt
Route loader runs
  -> check localStorage for token
  -> if no token, redirect to /login
  -> if token exists, request protected API data
  -> return loader data to the page
```

Example protected pages:

```txt
/dashboard
/projects
/projects/:projectId
/bugs
/bugs/:bugId
/account
```

Frontend route protection is for user experience. The backend still performs real authentication and authorization through JWT verification and resource ownership checks.

---

## API Integration

The client connects to the deployed Bug-Board Express API.

Production API base URL:

```txt
https://bug-board.onrender.com/api/v1
```

Local API base URL:

```txt
http://localhost:3000/api/v1
```

The client uses a Vite environment variable:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

For Vercel production:

```env
VITE_API_BASE_URL=https://bug-board.onrender.com/api/v1
```

Example request:

```ts
fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`);
```

Which becomes:

```txt
https://bug-board.onrender.com/api/v1/auth/login
```

---

## API Resources Used by the Client

Main API resources:

```txt
/auth
/projects
/bugs
/comments
```

Current frontend API files:

```txt
src/api/auth.ts
src/api/projects.ts
src/api/bugs.ts
```

Planned future API files:

```txt
src/api/comments.ts
src/api/account.ts
```

---

## Environment Variables

Create a local `.env.local` file in the client directory.

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

For deployed Vercel environments, configure:

```env
VITE_API_BASE_URL=https://bug-board.onrender.com/api/v1
```

Do not commit real `.env` files.

A safe example file can be committed as:

```txt
.env.example
```

Example:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## Vercel Deployment

The client is deployed on Vercel.

Deployment settings:

```txt
Root Directory: client
Framework Preset: Vite
Install Command: pnpm install
Build Command: pnpm build
Output Directory: dist
```

Production environment variable:

```env
VITE_API_BASE_URL=https://bug-board.onrender.com/api/v1
```

---

## React Router + Vercel Rewrite

Because this app uses React Router browser routes, Vercel needs to rewrite route requests back to `index.html`.

File:

```txt
client/vercel.json
```

Contents:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This prevents refresh errors on routes such as:

```txt
/dashboard
/projects
/projects/:projectId
/bugs
/bugs/:bugId
/account
```

---

## Backend CORS Requirement

The deployed API must allow the deployed frontend origin.

Frontend origin:

```txt
https://bug-board-gilt.vercel.app
```

The Render API should use:

```env
CLIENT_URL=https://bug-board-gilt.vercel.app
```

The backend CORS config should allow the Vercel frontend origin and local development origin.

Recommended backend CORS setup:

```ts
const allowedOrigins: string[] = [process.env.CLIENT_URL, 'http://localhost:5173'].filter(
  (origin): origin is string => Boolean(origin)
);

app.use(
  cors({
    origin: allowedOrigins,
  })
);
```

---

## Styling

The client currently uses CSS Modules.

Each page generally has its own CSS module:

```txt
DashboardPage.tsx
DashboardPage.module.css
```

```txt
ProjectsPage.tsx
ProjectsPage.module.css
```

```txt
LoginPage.tsx
LoginPage.module.css
```

Current styling approach:

- Page-level layout classes
- Card-based UI sections
- Simple responsive grids
- Shared visual style across public and protected pages
- Blue/white app theme
- CSS Modules for scoped styles

---

## Page Notes

### Landing Page

Route:

```txt
/
```

Purpose:

- Introduce Bug-Board
- Explain project/bug tracking workflow
- Link to signup and login

### Signup Page

Route:

```txt
/signup
```

Purpose:

- Create a new user
- Store returned JWT
- Redirect to dashboard

### Login Page

Route:

```txt
/login
```

Purpose:

- Authenticate existing user
- Store returned JWT
- Redirect to dashboard

Demo login:

```txt
Email: demo@bugboard.dev
Password: password123
```

### Dashboard Page

Route:

```txt
/dashboard
```

Purpose:

- Show project and bug overview
- Show total projects
- Show total bugs
- Show open bugs
- Link to project and bug details

### Projects Page

Route:

```txt
/projects
```

Purpose:

- List authenticated user's projects
- Show project count
- Link to project detail pages
- Link to create project page

### Create Project Page

Route:

```txt
/projects/new
```

Purpose:

- Create a new project
- Redirect to the new project detail page

### Project Detail Page

Route:

```txt
/projects/:projectId
```

Purpose:

- Show project information
- Link back to projects
- Link to create a bug for the project

Future plans:

- Project bug summary
- Project-specific bug list
- Project delete workflow

### Bugs Page

Route:

```txt
/bugs
```

Purpose:

- List bugs across the authenticated user's accessible data
- Show bug count
- Show open bug count
- Show high/critical bug count
- Link to bug detail pages

### Create Bug Page

Route:

```txt
/projects/:projectId/bugs/new
```

Purpose:

- Create a bug under a project
- Submit title, description, priority, severity, and project ID
- Redirect to the new bug detail page

### Bug Detail Page

Route:

```txt
/bugs/:bugId
```

Purpose:

- Show bug title and description
- Show status, priority, and severity
- Show created and updated dates
- Link back to related project

Future plans:

- Project title context
- Comment list
- Add comment form
- Status update controls

### Account Page

Route:

```txt
/account
```

Purpose:

- Show current user account details
- Show name, email, created date, and updated date

Future plans:

- Edit profile
- Change password

### Not Found Page

Route:

```txt
*
```

Purpose:

- Display 404 page
- Provide helpful navigation links

---

## Local Development

Install dependencies from the client directory:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build the client:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

---

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

---

## Development Notes

Current frontend priority:

1. Continue UI polish
2. Add better loading and error states
3. Improve auth failure handling
4. Add comments to bug detail pages
5. Add project-specific bug list to project detail pages
6. Add profile update form
7. Add password update form
8. Improve protected route invalid-token behavior

Important rule:

```txt
Client provides content.
Server provides identity and ownership.
```

Frontend responsibilities:

```txt
Collect input
Render data
Navigate between pages
Send token with protected requests
Handle loading/error/empty states
```

Backend responsibilities:

```txt
Authenticate users
Authorize resource access
Assign ownership
Validate requests
Protect data
```

---

## Related Documentation

- [Root README](../README.md)
- [Server README](../server/README.md)
- [API Flow](../docs/api-flow.md)
- [Error Handling Notes](../docs/error-handling.md)
