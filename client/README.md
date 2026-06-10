# Bug-Board Client

The Bug-Board client is the Vue frontend for the Bug-Board full-stack bug tracking application.

It is built with Vue, Vite, TypeScript, Vue Router, and scoped styles or CSS Modules.

This frontend is currently in active development.

---

## Client Goal

Build a clean frontend for managing authenticated bug tracking workflows.

The client will provide:

- Public landing page
- Signup and login pages
- Protected app routes
- Dashboard page
- Project list and project detail pages
- Bug detail page
- Create project and create bug pages
- Account/profile page

---

## Tech Stack

- Vue
- Vite
- TypeScript
- Vue Router
- Scoped styles or CSS Modules
- pnpm

---

## Current Status

Current frontend focus:

- Vue client setup
- Vue Router setup
- Public and protected layouts
- Login/signup UI
- Auth state handling
- API connection to the Express backend

Planned page folders:

```txt
src/
  pages/
    account/
    bugs/
    dashboard/
    landing/
    login/
    not-found/
    projects/
    root/
    signup/
```

---

## Planned Frontend Routes

```txt
/                              Landing page
/login                         Login page
/signup                        Signup page

/dashboard                     Dashboard
/projects                      Projects list
/projects/new                  Create project
/projects/:projectId           Project details
/projects/:projectId/bugs/new  Create bug
/bugs/:bugId                   Bug details

/account                       Account page
*                              Not found page
```

---

## Layout Plan

The app will use route layouts to separate public pages from authenticated app pages.

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
    CreateBugPage
    BugDetailPage
    AccountPage
```

### RootLayout

Top-level layout for the app.

### PublicLayout

Used for unauthenticated pages such as landing, login, and signup.

### ProtectedLayout

Used for authenticated app pages such as dashboard, projects, bugs, and account.

Protected routes will require the user to be authenticated before viewing app content.

---

## Suggested Page Structure

```txt
src/
  pages/
    account/
      AccountPage.vue

    bugs/
      BugDetailPage.vue
      CreateBugPage.vue

    dashboard/
      DashboardPage.vue

    landing/
      LandingPage.vue

    login/
      LoginPage.vue

    not-found/
      NotFoundPage.vue

    projects/
      ProjectsPage.vue
      ProjectDetailPage.vue
      CreateProjectPage.vue

    root/
      RootLayout.vue
      PublicLayout.vue
      ProtectedLayout.vue

    signup/
      SignupPage.vue
```

---

## Auth Flow Plan

The backend currently supports:

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
  -> store auth state
  -> redirect to dashboard
  -> use token for protected API requests
```

Protected API requests require:

```txt
Authorization: Bearer <token>
```

For the current version, token handling may start with local storage or in-memory state. A future improvement may move auth to Secure, HttpOnly cookies.

---

## Backend API

The client connects to the Bug-Board Express API.

Base API path:

```txt
/api/v1
```

Main resources:

```txt
/auth
/users
/projects
/bugs
/comments
```

See the server README for detailed backend API documentation.

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

## Development Notes

Current frontend priority:

1. Set up Vue Router
2. Create public and protected layouts
3. Build landing, login, and signup pages
4. Add auth state/token handling
5. Add protected dashboard route
6. Connect project pages to backend API
7. Build project and bug workflows

The client is intentionally being built incrementally to match backend feature progress.
