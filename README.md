# Bug-Board

Bug-Board is a full-stack bug tracking application built with React, Express, TypeScript, and MongoDB.

The goal of Bug-Board is to provide a simple project-based bug tracking workflow where users can create projects, track bugs, manage issue status, and work with protected user-owned data.

The backend API is deployed on Render, the frontend client is deployed on Vercel, and the application is currently in active development.

---

## Live App

Frontend:

```txt
https://bug-board-gilt.vercel.app
```

Backend API:

```txt
https://bug-board.onrender.com
```

Health check:

```txt
GET https://bug-board.onrender.com/api/v1/health
```

API base path:

```txt
/api/v1
```

---

## Demo Accounts

The deployed app includes seeded demo data for testing authentication, protected routes, project ownership, and bug workflows.

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

The second user exists to test resource ownership boundaries. Each user should only be able to access their own projects, bugs, and allowed related resources.

---

## Project Goal

Build a portfolio-ready full-stack application that demonstrates:

- Full-stack JavaScript/TypeScript development
- REST API design
- JWT authentication
- Protected API routes
- Resource ownership and authorization checks
- MongoDB/Mongoose data modeling
- React frontend routing and page structure
- Public and protected route layouts
- Project and bug workflows
- Frontend/backend integration
- Deployed full-stack application architecture
- MongoDB Atlas production database usage

---

## Current Status

### Completed

- Express API setup
- TypeScript backend setup
- MongoDB/Mongoose connection
- MongoDB Atlas database connection
- Production database connection using `DB_CLOUD`
- Local database connection using `DB_LOCAL`
- User, project, bug, and comment models
- User, project, bug, and comment route/controller structure
- Centralized error handling
- Custom `AppError` utility
- Mongoose validation/error formatting
- JWT signup/login authentication
- Protected auth routes
- Password hashing with bcrypt
- Current user route
- Authenticated profile update route
- Authenticated password update route
- Password-changed token invalidation
- Resource ownership checks for projects, bugs, and comments
- Project ownership assigned server-side from authenticated users
- Bug creation restricted to projects owned by the authenticated user
- Comment creation restricted to bugs under projects owned by the authenticated user
- Demo database seed script
- Backend API deployed to Render
- Frontend client deployed to Vercel
- CORS configured for frontend/backend communication
- Vercel SPA rewrite configured for React Router
- Login/signup connected to deployed API
- Protected frontend routes
- Dashboard page
- Projects page
- Project detail page
- Create project page
- Bugs page
- Bug detail page
- Create bug page
- Account page
- Not found page
- CSS Modules styling across core pages

### Current Focus

- UI polish
- Better loading and error states
- Improved invalid/expired token handling
- Comment integration on bug detail pages
- Project-specific bug summaries
- Account profile update flow
- Password update flow

### Future Work

- Admin-only user management routes
- Role-based access if needed
- Search and filtering
- Pagination
- Project deletion cleanup strategy for related bugs/comments
- Bug status update controls
- Comment creation from the frontend
- Additional production hardening

---

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- React Router
- CSS Modules
- Vercel

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- CORS
- Morgan
- Render

### Tools

- pnpm
- Postman
- VS Code
- Prettier
- ESLint
- Git/GitHub
- MongoDB Atlas

---

## Repository Structure

```txt
bug-board/
  client/     React frontend
  server/     Express API
  docs/       Project notes and API documentation
```

---

## Documentation

- [Client README](./client/README.md)
- [Server README](./server/README.md)
- [API Flow](./docs/api-flow.md)
- [Error Handling Notes](./docs/error-handling.md)

---

## Frontend Routes

Current frontend route structure:

```txt
/                              Landing page
/login                         Login page
/signup                        Signup page

/dashboard                     Dashboard
/projects                      Projects list
/projects/new                  Create project
/projects/:projectId           Project details
/projects/:projectId/bugs/new  Create bug
/bugs                          Bugs list
/bugs/:bugId                   Bug details

/account                       Account page
*                              Not found page
```

---

## Frontend Route Layouts

The client uses React Router layouts to separate public pages from protected app pages.

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

Protected routes check for a JWT token before loading protected app data.

Frontend route protection improves the user experience, but backend authentication and authorization still provide the real data protection.

---

## API Overview

Base API path:

```txt
/api/v1
```

Current API resources:

```txt
/auth
/users
/projects
/bugs
/comments
```

Auth routes include signup, login, current user, profile update, and password update.

Project, bug, and comment routes are protected. Resource ownership checks are implemented for the current MVP backend.

More API details are documented in the server README.

---

## API Testing

The deployed Bug-Board API can be tested with the included Postman collection.

Useful URLs:

```txt
Live API:     https://bug-board.onrender.com
Health Check: https://bug-board.onrender.com/api/v1/health
Frontend:     https://bug-board-gilt.vercel.app
```

Demo credentials:

```txt
demo@bugboard.dev / password123
second@bugboard.dev / password123
```

Protected requests require:

```txt
Authorization: Bearer <token>
```

---

## API Testing Flow

A basic Postman test flow:

```txt
GET   /api/v1/health

POST  /api/v1/auth/login
GET   /api/v1/auth/me

GET   /api/v1/projects
POST  /api/v1/projects
GET   /api/v1/projects/:id
PATCH /api/v1/projects/:id
DELETE /api/v1/projects/:id

GET   /api/v1/bugs
POST  /api/v1/bugs
GET   /api/v1/bugs/:id
PATCH /api/v1/bugs/:id
DELETE /api/v1/bugs/:id

GET   /api/v1/comments
POST  /api/v1/comments
GET   /api/v1/comments/:id
PATCH /api/v1/comments/:id
DELETE /api/v1/comments/:id
```

---

## Environment Variables

### Client

Local client `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Vercel production variable:

```env
VITE_API_BASE_URL=https://bug-board.onrender.com/api/v1
```

### Server

Local server `.env`:

```env
NODE_ENV=development
PORT=3000
DB_LOCAL=mongodb://127.0.0.1:27017/bug-board
DB_CLOUD=mongodb+srv://...
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Render production variables:

```env
NODE_ENV=production
DB_CLOUD=mongodb+srv://...
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
CLIENT_URL=https://bug-board-gilt.vercel.app
```

Do not commit real `.env` files.

---

## Deployment

### Frontend

The frontend is deployed on Vercel.

```txt
Frontend URL: https://bug-board-gilt.vercel.app
Root Directory: client
Framework Preset: Vite
Build Command: pnpm build
Output Directory: dist
```

The client uses a Vercel rewrite for React Router browser routes.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Backend

The backend API is deployed on Render.

```txt
API URL: https://bug-board.onrender.com
Root Directory: server
Build Command: pnpm install && pnpm build
Start Command: pnpm start
```

The production database uses MongoDB Atlas.

---

## Planned Features

- User authentication
- Protected frontend routes
- Project management
- Bug/issue tracking
- Bug status updates
- Priority and severity labels
- Comments on bugs
- Dashboard summary
- Search and filtering
- Resource ownership and authorization
- Admin-only user management
- Improved frontend error handling
- Full portfolio polish

---

## Project Planning

View the project board here:  
[Bug Board Project](https://github.com/users/mdubelbeis/projects/6/views/1)

Bug-Board is being developed using a public GitHub Project board to track feature work, backend milestones, user stories, frontend tasks, authorization work, and deployment planning.

---

## Development Notes

Important backend rules:

```txt
Client provides content.
Server provides identity and ownership.
```

```txt
Authentication answers: Who are you?
Authorization answers: What are you allowed to access?
```

Frontend responsibilities:

```txt
Collect input.
Render data.
Navigate between pages.
Send the token with protected requests.
Handle loading, error, and empty states.
```

Backend responsibilities:

```txt
Authenticate users.
Authorize resource access.
Assign ownership.
Validate requests.
Protect data.
```

---

## Related Documentation

- [Client README](./client/README.md)
- [Server README](./server/README.md)
- [API Flow](./docs/api-flow.md)
- [Error Handling Notes](./docs/error-handling.md)
