# Bug-Board

Bug-Board is a full-stack bug tracking application built with React, Express, TypeScript, and MongoDB.

The goal of Bug-Board is to provide a simple project-based bug tracking workflow where users can create projects, track bugs, update issue status, and manage comments.

The backend API is deployed and the frontend client is currently in development.

---

## Live API

Base URL:

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

## API Testing

The deployed Bug-Board API can be tested with the included Postman collection.

- Live API: https://bug-board.onrender.com
- Health Check: https://bug-board.onrender.com/api/v1/health
- Demo User: demo@bugboard.dev / password123
- Second User: second@bugboard.dev / password123

---

## Demo Accounts

The deployed API includes seeded demo data for testing authentication, protected routes, and ownership behavior.

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

The second user exists to test resource ownership boundaries. Each user should only be able to access their own projects and allowed related resources.

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
- Project, bug, and comment workflows
- Real-world full-stack application architecture
- Deployed backend API with MongoDB Atlas

---

## Current Status

### Completed

- Express API setup
- TypeScript backend setup
- MongoDB/Mongoose connection
- MongoDB Atlas database connection
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

### Current Focus

- React frontend implementation
- Frontend routing
- Public and protected page layouts
- Login/signup UI
- Dashboard and project pages
- Connecting the frontend client to the deployed API

### Future Backend Work

- Admin-only user management routes
- Role-based access if needed
- Search and filtering
- Pagination
- Project deletion cleanup strategy for related bugs/comments
- Additional production hardening

---

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- React Router
- CSS Modules

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

### Tools & Deployment

- pnpm
- Postman
- VS Code
- Prettier
- ESLint
- Morgan
- Git/GitHub
- Render
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

Planned frontend route structure:

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

## API Testing Flow

A basic Postman test flow:

```txt
GET  /api/v1/health

POST /api/v1/auth/login
GET  /api/v1/auth/me

GET  /api/v1/projects
POST /api/v1/projects
GET  /api/v1/projects/:id
PATCH /api/v1/projects/:id
DELETE /api/v1/projects/:id

GET  /api/v1/bugs
POST /api/v1/bugs
GET  /api/v1/bugs/:id
PATCH /api/v1/bugs/:id
DELETE /api/v1/bugs/:id

GET  /api/v1/comments
POST /api/v1/comments
GET  /api/v1/comments/:id
PATCH /api/v1/comments/:id
DELETE /api/v1/comments/:id
```

Protected requests require:

```txt
Authorization: Bearer <token>
```

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
- Full frontend deployment

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
