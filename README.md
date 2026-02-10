# PrimeTrade Full-Stack Task & Auth Assignment

This is a modern, scalable full-stack web application built with **Next.js**, **TypeScript**, **MongoDB**, and **Tailwind CSS**.

## Project Highlights
- **Framework**: Next.js 14+ (App Router) for both Frontend and Backend (API Routes).
- **Authentication**: JWT-based authentication using `httpOnly` cookies for maximum security.
- **Backend Logic**: Modular API routes with JWT validation and MongoDB integration.
- **Security**: Password hashing with `bcryptjs`, protected routing via Next.js Middleware.
- **Responsive Dashboard**: Full CRUD (Create, Read, Update, Delete) functionality with real-time search and status filtering.

---

## Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 2. Installation
```bash
cd webapp
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the `webapp` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 4. Running the App
```bash
npm run dev
```

---

## API Documentation

### Authentication
- `POST /api/auth/register`: Register a new user.
  - Body: `{ name, email, password }`
- `POST /api/auth/login`: Login and receive an `httpOnly` JWT cookie.
  - Body: `{ email, password }`
- `POST /api/auth/logout`: Clear the authentication cookie.

### Profile
- `GET /api/user/profile`: Fetch current user data (Protected).
- `PUT /api/user/profile`: Update user name (Protected).

### Tasks
- `GET /api/tasks`: Fetch all tasks for the logged-in user (Protected).
  - Query Params: `search=...`, `status=todo|in-progress|done`
- `POST /api/tasks`: Create a new task (Protected).
  - Body: `{ title, description, status }`
- `PATCH /api/tasks/[id]`: Update an existing task (Protected).
- `DELETE /api/tasks/[id]`: Delete a task (Protected).

---

## Scalability Notes (Production Grade)

To scale this frontend-backend integration for a production-level trading application:

1. **Architecture Decoupling**: 
   - Move from Next.js API routes to a dedicated **Backend Microservice** (e.g., Node/Express or Go) to handle heavy computation and independent scaling.
   - Use a **Load Balancer** (like Nginx or AWS ALB) to distribute traffic.

2. **Database Optimization**:
   - Implement **Redis Caching** for frequently accessed tasks or user profiles to reduce DB load.
   - Use **Read Replicas** for MongoDB to scale read operations.

3. **Frontend Performance**:
   - Use **SWR** or **TanStack Query** for better state management, optimistic updates, and automatic re-validation.
   - Implement **SSR (Server Side Rendering)** for the dashboard's initial load to improve perceived performance.

4. **Security & DevOps**:
   - Implement **Rate Limiting** on the API endpoints to prevent brute-force attacks.
   - Use **Docker** for containerization to ensure consistency across environments.
   - Set up **CI/CD** pipelines (Github Actions) for automated testing and deployment.

---

## Final Deliverables
- [x] Full UI/UX Implementation (Responsive)
- [x] JWT Authentication & Protected Routes
- [x] CRUD Operations for Tasks
- [x] Search & Filter Functionality
- [x] Documentation & Production Scaling Strategy

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
