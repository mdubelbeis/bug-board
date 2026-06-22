# Bug-Board Server

The Bug-Board server is the Express API for the Bug-Board full-stack bug tracking application.

It is built with Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt, MongoDB Atlas, and pnpm.

This backend is deployed on Render and is currently in active development.

---

## Live API

Base URL:

```txt
https://bug-board.onrender.com
```

API base path:

```txt
/api/v1
```

Health check:

```txt
GET https://bug-board.onrender.com/api/v1/health
```

Frontend client:

```txt
https://bug-board-gilt.vercel.app
```

---

## Demo Accounts

The deployed API includes seeded demo data for testing authentication, protected routes, project ownership, bug ownership, and resource access boundaries.

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

The second user is included to test ownership boundaries. The demo user should not be able to access the second user's private project data, and the second user should not be able to access the demo user's project data.

---

## Server Goal

Provide a REST API for:

- User authentication
- Protected routes
- Project management
- Bug tracking
- Comments on bugs
- Account/profile management
- Resource ownership
- Future admin-only user management

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Morgan
- dotenv
- CORS
- pnpm
- Render

---

## Current Status

Completed so far:

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
- JWT signup and login
- Password hashing with bcrypt
- Protected route middleware
- Current user route
- Authenticated profile update route
- Authenticated password update route
- Password-changed token invalidation
- Resource ownership checks for projects, bugs, and comments
- Project ownership assigned server-side from authenticated users
- Bug creation restricted to projects owned by the authenticated user
- Comment creation restricted to bugs under projects owned by the authenticated user
- Demo database seed script
- CORS configured for deployed frontend
- API deployed to Render
- Frontend connected through deployed Vercel client

Current backend focus:

- Deployment testing
- Frontend integration polish
- API response consistency
- Future admin-only user management
- Comment integration on the frontend

---

## API Resources

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
POST  /api/v1/auth/signup
POST  /api/v1/auth/login
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
  "email": "demo@bugboard.dev",
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

User routes are planned as future admin-only routes.

Normal user account actions are handled through the auth routes:

```txt
GET   /api/v1/auth/me
PATCH /api/v1/auth/me
PATCH /api/v1/auth/update-password
```

Future plan:

- Limit general user management routes to admins
- Keep self-service account updates under `/auth/me`
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

Ownership behavior:

- Project ownership is assigned server-side from `req.user`
- Users can only read, update, and delete their own projects
- Client-provided `owner` fields are not trusted

Example create body:

```json
{
  "title": "Portfolio Redesign",
  "description": "Track bugs and tasks for a portfolio rebuild."
}
```

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

Ownership behavior:

- Bugs belong to projects
- Bug creation verifies that the project belongs to the authenticated user
- Bug creator is assigned server-side from `req.user`
- Users can only read, update, and delete bugs they are authorized to access
- Client-provided ownership fields are not trusted

Example create body:

```json
{
  "title": "Login button does not submit",
  "description": "Clicking the login button does not send the form.",
  "status": "OPEN",
  "priority": "HIGH",
  "severity": "MAJOR",
  "project": "PROJECT_ID_HERE"
}
```

Valid bug status values:

```txt
OPEN
IN_PROGRESS
RESOLVED
CLOSED
```

Valid priority values:

```txt
LOW
MEDIUM
HIGH
CRITICAL
```

Valid severity values:

```txt
MINOR
MAJOR
BLOCKING
```

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

Ownership behavior:

- Comments belong to bugs
- Comment author is assigned server-side from `req.user`
- Comment creation verifies that the bug belongs to a project owned by the authenticated user
- Users can only read, update, and delete comments they are authorized to access
- Client-provided ownership fields are not trusted

Example create body:

```json
{
  "body": "I reproduced this issue on the deployed frontend.",
  "bug": "BUG_ID_HERE"
}
```

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
createdBy
```

### Comment

Core fields:

```txt
body
bug
author
```

---

## Demo Seed Data

The server includes a seed script for demo/testing data.

Seeded demo users:

```txt
demo@bugboard.dev
password123
```

```txt
second@bugboard.dev
password123
```

The seed data includes:

- Demo users
- Projects
- Bugs
- Comments
- Ownership-separated data for testing access boundaries

Run the seed script from the server directory:

```bash
pnpm seed
```

The seed script is intended for demo/development use. Do not run it automatically during deployment.

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

## CORS

The deployed API allows requests from the deployed frontend client.

Production frontend origin:

```txt
https://bug-board-gilt.vercel.app
```

Local frontend origin:

```txt
http://localhost:5173
```

Recommended CORS setup:

```ts
const allowedOrigins: string[] = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
  })
);
```

In production, `CLIENT_URL` should be set on Render:

```env
CLIENT_URL=https://bug-board-gilt.vercel.app
```

Do not include a trailing slash.

---

## Environment Variables

Create a `.env` file in the server directory for local development.

Required local variables:

```env
NODE_ENV=development
PORT=3000
DB_LOCAL=mongodb://127.0.0.1:27017/bug-board
DB_CLOUD=mongodb+srv://...
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Production variables configured on Render:

```env
NODE_ENV=production
DB_CLOUD=mongodb+srv://...
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
CLIENT_URL=https://bug-board-gilt.vercel.app
```

Render does not need `DB_LOCAL`.

Generate a JWT secret with:

```bash
openssl rand -hex 32
```

For deployment, configure environment variables in the hosting platform instead of committing `.env`.

---

## Database Connection

The server chooses the database connection based on `NODE_ENV`.

Production should use:

```txt
DB_CLOUD
```

Local development should use:

```txt
DB_LOCAL
```

Example connection selection:

```ts
const DB =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_CLOUD
    : process.env.DB_LOCAL;

if (!DB) {
  throw new Error('Database connection string is not defined');
}
```

This prevents the deployed Render API from trying to connect to a local MongoDB instance.

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

Run the seed script:

```bash
pnpm seed
```

---

## Scripts

```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "seed": "tsx src/seed/seed.ts"
}
```

---

## Deployment

The API is deployed on Render.

Live API:

```txt
https://bug-board.onrender.com
```

Health check:

```txt
GET /api/v1/health
```

Deployment setup:

```txt
Root Directory: server
Build Command: pnpm install && pnpm build
Start Command: pnpm start
```

Database:

```txt
MongoDB Atlas
```

Required Render environment variables:

```env
NODE_ENV=production
DB_CLOUD=mongodb+srv://...
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
CLIENT_URL=https://bug-board-gilt.vercel.app
```

---

## Frontend Integration

The frontend is deployed on Vercel:

```txt
https://bug-board-gilt.vercel.app
```

The frontend should use the deployed API base URL:

```env
VITE_API_BASE_URL=https://bug-board.onrender.com/api/v1
```

This allows frontend requests such as:

```txt
POST https://bug-board.onrender.com/api/v1/auth/login
GET  https://bug-board.onrender.com/api/v1/projects
GET  https://bug-board.onrender.com/api/v1/bugs
```

---

## Development Notes

Current backend priority:

1. Test deployed API routes
2. Verify deployed auth and ownership flows
3. Continue frontend integration
4. Refine user routes as future admin-only routes
5. Add comments to frontend bug detail pages
6. Improve API response consistency as the app grows

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
