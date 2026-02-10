# PrimeTrade - Project Approach & Architecture

This document outlines the technical approach, architecture, and design decisions made during the development of the PrimeTrade application.

## 1. Tech Stack Selection

- **Frontend & Backend Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
  - Chosen for its full-stack capabilities, excellent SEO, and performant server-side rendering.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
  - Provides a utility-first approach for rapid and consistent UI development.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
  - A flexible NoSQL database that allows for quick schema iterations.
- **Authentication**: JWT (JSON Web Tokens) via `jsonwebtoken` & `jose`
  - Stateless authentication suitable for serverless functions (Next.js API routes).
- **Validation**: [Zod](https://zod.dev/)
  - Schema-first validation for both API requests and frontend forms.
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
  - Efficient form handling with minimal re-renders.
- **Email Service**: [Nodemailer](https://nodemailer.com/)
  - For transactional emails (Forgot Password, Registration confirmations).

## 2. Architectural Design

The project follows a **Service-Oriented Clean Architecture** within the Next.js ecosystem:

### Directory Structure
- `src/app/api`: Handles HTTP requests, authentication verification, and response formatting.
- `src/services`: Contains core business logic (e.g., `AuthService`, `TaskService`). Keeping logic here makes it reusable and easier to test.
- `src/models`: Mongoose schemas defining the data structure and hooks (like password hashing).
- `src/lib`: Shared utilities such as database connection, authentication helpers, and mail configuration.
- `src/components`: Reusable UI components.

### Middleware & Route Protection
- **Proxy Pattern**: A centralized `proxy.ts` is used to define authentication logic and protected routes.
- **Root Redirection**: The root path (`/`) automatically redirects authenticated users to the `/dashboard` and unauthenticated users to `/login`, ensuring a seamless user experience.
- **API Guarding**: Protecting sensitive API endpoints (`/api/tasks`, `/api/user/profile`, etc.) by verifying JWT integrity before processing requests.

### Data Flow
1. **Frontend**: Dispatches requests (using `fetch` or `axios`) to API routes.
2. **API Route**: Extracts data, verifies JWT tokens from cookies, and passes the request to the appropriate **Service**.
3. **Service**: Performs business validation, interacts with **Mongoose Models**, and returns the result.
4. **Database**: Persistent storage via MongoDB.

## 3. Key Design Decisions

### Stateless Authentication
Instead of traditional sessions, we use **JWTs stored in HttpOnly cookies**. This approach:
- Prevents XSS attacks from accessing the token.
- Scaled easily across serverless environments.
- Simplifies authentication checks in both Server Components and API Routes.

### MongoDB Connection Pooling
Implemented a cached connection pattern in `lib/mongodb.ts` to prevent "Too many connections" errors in development due to Next.js hot-reloading.

### Password Security
- **Hashing**: Passwords are never stored in plain text. We use `bcryptjs` with a salt factor of 10.
- **Reset Logic**: Secure password reset flow using sha256-hashed tokens with an expiration time (1 hour).

### Error Handling
- Consistent error response structure across all API routes (`{ error: string }`).
- Graceful error handling in the UI using `react-hook-form` and toast/notification components (where applicable).

## 4. Scalability & Future Improvements
- **Rate Limiting**: To prevent brute force on authentication routes.
- **Caching**: Implement Redis for frequently accessed task data.
- **Testing**: Add Jest for unit tests in services and Playwright for E2E flows.
- **State Management**: As the app grows, consider React Context or Zustand for cross-component state.
