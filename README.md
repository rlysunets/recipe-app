# 🍴 Recipe App

A full-stack recipe application built with Next.js, React, TypeScript, Material UI, Prisma and PostgreSQL.

The application allows users to search for recipes, filter results, view recipe details, manage favorites and, as development progresses, create and manage their own recipes.

The project is being developed as a portfolio project to demonstrate practical full-stack development skills, including frontend development, REST API design, database integration, authentication, validation and deployment.

## 🚀 Live Demo

**Production:**  
https://recipe-app-wheat-alpha.vercel.app/

## 📦 Repository

**GitHub:**  
https://github.com/rlysunets/recipe-app

---

# ✨ Features

### Recipe browsing

- Browse recipes
- Search recipes
- Filter recipes by category
- View detailed recipe information
- Responsive recipe cards
- Recipe details page

### User functionality

- User registration
- User validation
- Secure password hashing
- User data stored in PostgreSQL
- Authentication
- User-specific favorites
- Add/remove recipes from favorites

### Backend

- REST API built with Next.js Route Handlers
- User API
- Recipe API
- Favorites API
- Request validation
- Service layer
- Database access through Prisma ORM
- PostgreSQL database

### Deployment

- Production deployment with Vercel
- PostgreSQL database hosted on Neon
- Automatic deployments from GitHub

---

# 🛠️ Tech Stack

## Frontend

- **Next.js 16** — React framework with App Router
- **React 19**
- **TypeScript**
- **Material UI (MUI)** — UI components
- **CSS / MUI styling**
- **React Server Components**
- **Client Components** for interactive functionality

## Backend

- **Next.js Route Handlers**
- **Node.js**
- **TypeScript**
- **REST API**
- **Zod** — request validation
- **bcrypt** — password hashing
- **Service layer architecture**

## Database

- **PostgreSQL**
- **Prisma ORM**
- **Neon PostgreSQL** — production database

## Development Tools

- **Git**
- **GitHub**
- **ESLint**
- **Prettier**
- **npm**
- **Vercel**

---

# 🏗️ Architecture

The application uses a full-stack architecture inside a single Next.js repository.

```text
┌──────────────────────────────┐
│          Next.js             │
│                              │
│  ┌────────────┐              │
│  │   React    │              │
│  │  Frontend  │              │
│  └─────┬──────┘              │
│        │                     │
│        │ HTTP                │
│        ▼                     │
│  ┌────────────┐              │
│  │ Route      │              │
│  │ Handlers   │              │
│  │ /api/*     │              │
│  └─────┬──────┘              │
│        │                     │
│        ▼                     │
│  ┌────────────┐              │
│  │ Services   │              │
│  └─────┬──────┘              │
│        │                     │
│        ▼                     │
│  ┌────────────┐              │
│  │  Prisma    │              │
│  │    ORM     │              │
│  └─────┬──────┘              │
└────────┼─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│     PostgreSQL / Neon        │
└──────────────────────────────┘
