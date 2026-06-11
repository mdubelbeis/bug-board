# Bug-Board

Bug-Board is a full-stack bug tracking application built with React, Express, TypeScript, and MongoDB.

The goal of Bug-Board is to provide a simple project-based bug tracking workflow where users can create projects, track bugs, update issue status, and manage comments.

This project is currently in active development.

---

## Project Goal

Build a portfolio-ready full-stack application that demonstrates:

- Full-stack JavaScript/TypeScript development
- REST API design
- JWT authentication
- Protected routes
- MongoDB/Mongoose data modeling
- React frontend routing and page structure
- Project, bug, and comment workflows
- Real-world full-stack application architecture

---

## Current Status

Bug-Board currently includes backend API foundations and initial frontend planning.

Current focus:

- React frontend implementation
- Frontend routing
- Public and protected page layouts
- Login/signup UI
- Dashboard and project pages

Completed so far:

- Express API setup
- MongoDB/Mongoose connection
- User, project, bug, and comment resource structure
- Centralized error handling
- JWT signup/login authentication
- Protected auth routes
- Password hashing and password update flow
- Initial frontend route planning

Next backend focus:

- Resource ownership
- Authorization checks
- Preventing users from accessing other users' projects, bugs, and comments

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
- Mongoose
- JWT
- bcrypt

### Tools

- pnpm
- Postman
- VS Code
- Prettier
- ESLint
- Morgan
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

Project, bug, and comment routes are protected. Resource ownership and authorization checks are planned next.

More API details are documented in the server README.

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
- Deployment

---

## Project Planning

View the project board here:  
[Bug Board Project](https://github.com/users/mdubelbeis/projects/6/views/1)

Bug-Board is being developed using a public GitHub Project board to track feature work, backend milestones, user stories, frontend tasks, authorization work, and deployment planning.
