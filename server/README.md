# Bug-Board Server

The Bug-Board server is the Express API for the Bug-Board full-stack bug tracking application.

It is built with Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, and bcrypt.

This backend is currently in active development.

---

## Server Goal

Provide a REST API for:

- User authentication
- Protected routes
- Project management
- Bug tracking
- Comments on bugs
- Account/profile management
- Future ownership and authorization rules

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- Morgan
- dotenv
- pnpm

---

## Current Status

Completed so far:

- Express API setup
- MongoDB/Mongoose connection
- TypeScript backend setup
- User, project, bug, and comment models
- User, project, bug, and comment route/controller structure
- Centralized error handling
- Custom `AppError` utility
- Mongoose validation/error formatting
- JWT signup and login
- Password hashing with bcrypt
- Protected route middleware
- Current user route
- Authenticated profile update route
- Authenticated password update route
- Password-changed token invalidation

Current backend focus:

- Resource ownership
- Authorization checks
- Preventing users from accessing other users' projects, bugs, and comments

---

## API Base Path

```txt
/api/v1
```

Main API resources:

```txt
/auth
/users
/projects
/bugs
/comments
```

---

## Authentication

Bug-Board uses JWT authentication.

Authenticated requests require a bearer token:

```txt
Authorization: Bearer <token>
```

Tokens are returned from:

```txt
POST /api/v1/auth/signup
POST /api/v1/auth/login
PATCH /api/v1/auth/update-password
```

The server verifies tokens through the `protect` middleware.

Protected routes attach the authenticated user to:

```ts
req.user;
```

---

## Auth Routes

```txt
POST  /api/v1/auth/signup
POST  /api/v1/auth/login
GET   /api/v1/auth/me
PATCH /api/v1/auth/me
PATCH /api/v1/auth/update-password
```

### `POST /api/v1/auth/signup`

Creates a new user account and returns a JWT.

Expected body:

```json
{
  "name": "Mason",
  "email": "mason@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

### `POST /api/v1/auth/login`

Logs in an existing user and returns a JWT.

Expected body:

```json
{
  "email": "mason@example.com",
  "password": "password123"
}
```

### `GET /api/v1/auth/me`

Returns the currently authenticated user.

Requires:

```txt
Authorization: Bearer <token>
```

### `PATCH /api/v1/auth/me`

Updates the authenticated user's non-password profile fields.

Requires:

```txt
Authorization: Bearer <token>
```

Allowed fields:

```txt
name
email
```

Password updates are not allowed on this route.

### `PATCH /api/v1/auth/update-password`

Updates the authenticated user's password.

Requires:

```txt
Authorization: Bearer <token>
```

Expected body:

```json
{
  "currentPassword": "currentPassword123",
  "password": "newPassword123",
  "passwordConfirm": "newPassword123"
}
```

This route:

- Verifies the current password
- Sets the new password
- Hashes the password through Mongoose save middleware
- Updates `passwordChangedAt`
- Returns a new JWT

---

## User Routes

```txt
GET    /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

User routes are being refined as authentication and authorization are added.

Future plan:

- Limit general user management routes
- Move self-service account updates under `/auth/me`
- Add role-based access if needed

---

## Project Routes

```txt
GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/:id
PATCH  /api/v1/projects/:id
DELETE /api/v1/projects/:id
```

Project routes are protected.

Current/future ownership behavior:

- Project ownership will be assigned server-side from `req.user`
- Users should only read, update, and delete their own projects
- Client-provided `owner` fields should not be trusted

---

## Bug Routes

```txt
GET    /api/v1/bugs
POST   /api/v1/bugs
GET    /api/v1/bugs/:id
PATCH  /api/v1/bugs/:id
DELETE /api/v1/bugs/:id
```

Bug routes are protected.

Current/future ownership behavior:

- Bugs should belong to projects
- Users should only access bugs for projects they own or can access
- Client-provided ownership fields should not be trusted

---

## Comment Routes

```txt
GET    /api/v1/comments
POST   /api/v1/comments
GET    /api/v1/comments/:id
PATCH  /api/v1/comments/:id
DELETE /api/v1/comments/:id
```

Comment routes are protected.

Current/future ownership behavior:

- Comments should belong to bugs
- Comment author should be set server-side from `req.user`
- Users should only access comments for bugs/projects they can access

---

## Data Models

Current models:

```txt
User
Project
Bug
Comment
```

### User

Core fields:

```txt
name
email
password
passwordConfirm
passwordChangedAt
```

Notes:

- Passwords are hashed before save
- Password confirmation is used for validation and removed before storage
- Password field is hidden by default with `select: false`
- Password change timestamps are used to invalidate old tokens

### Project

Core fields:

```txt
title
description
owner
```

### Bug

Core fields:

```txt
title
description
status
priority
severity
project
author
```

### Comment

Core fields:

```txt
body
bug
author
```

---

## Error Handling

The API uses centralized error handling.

Common response shape:

```json
{
  "status": "fail",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "A valid email is required"
    }
  ]
}
```

General auth errors may return an empty `errors` array:

```json
{
  "status": "fail",
  "message": "Invalid token. Please log in again.",
  "errors": []
}
```

Handled error types include:

- Mongoose validation errors
- Duplicate key errors
- Invalid ObjectId/CastError
- App-specific operational errors
- JWT invalid token errors
- JWT expired token errors

See the main docs folder for additional error handling notes.

---

## Environment Variables

Create a `.env` file in the server directory.

Required variables:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
```

Generate a JWT secret with:

```bash
openssl rand -hex 32
```

---

## Local Development

Install dependencies from the server directory:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build the TypeScript project:

```bash
pnpm build
```

Run the compiled server:

```bash
pnpm start
```

---

## Scripts

```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

## Development Notes

Current backend priority:

1. Finish resource ownership rules
2. Set project ownership from authenticated user
3. Prevent access to other users' resources
4. Validate project access before creating bugs
5. Validate bug/project access before creating comments
6. Refine user routes
7. Add frontend integration support as needed

Important rules:

```txt
Client provides content.
Server provides identity and ownership.
```

```txt
Authentication answers: Who are you?
Authorization answers: What are you allowed to access?
```

---

## Related Documentation

- [Root README](../README.md)
- [Client README](../client/README.md)
- [API Flow](../docs/api-flow.md)
- [Error Handling Notes](../docs/error-handling.md)
