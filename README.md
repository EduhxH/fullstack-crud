<div align="center">

<img src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/node.js-v18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/mongodb-atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/deployed-render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />

<br/>
<br/>

# 👤 Fullstack CRUD — User Management System

**A complete full-stack application for user registration, listing, filtering, editing and deletion.**  
Built with a modern JavaScript stack focused on clean architecture and frontend-backend integration.

> ⚠️ **Note:** The source code, comments and variable names are written in **Portuguese (pt-BR)**, as this project was developed for study purposes in a Brazilian/Portuguese context.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Project Structure](#-project-structure)

</div>

---

## 📸 Overview

| Feature | Status |
|---|---|
| List all users | ✅ |
| Filter by name, age or email | ✅ |
| Register new users | ✅ |
| Edit users | ✅ |
| Delete users | ✅ |
| Pagination | ✅ |
| Admin authentication with JWT | ✅ |
| Input validation with Zod | ✅ |
| Frontend consuming REST API via Axios | ✅ |
| Persistent data with MongoDB Atlas | ✅ |
| Deployed on Render | ✅ |
| Photo gallery page | ✅ |
| Public comment system | ✅ |

---

## ✨ Features

- 📋 **User listing** — fetches and displays all registered users with pagination
- 🔍 **Dynamic filtering** — filter users by name, age or email via query params
- ➕ **User registration** — form that sends data to the API and updates the list instantly
- ✏️ **User editing** — update existing user data in real time
- 🗑️ **User deletion** — remove users with a single click, reflected immediately in the UI
- 🔐 **JWT Authentication** — protected routes with admin login/register
- ✅ **Input validation** — schema validation on both frontend and backend with Zod
- 🌐 **REST API** — clean and organized Express endpoints
- 🗄️ **Prisma ORM** — type-safe database access with schema-first modeling
- ☁️ **MongoDB Atlas** — cloud-hosted database, zero local setup required
- 🚀 **Deployed on Render** — live backend available at all times
- 🖼️ **Photo page** — a dedicated page featuring a photo gallery with a polished glassmorphism UI, built as a joke... but ended up being a great excuse to add more real features to the project
- 💬 **Public comment system** — anyone can leave a comment on the photo page; comments are persisted in the database and loaded in real time, no authentication required

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [Vite](https://vitejs.dev/) | Lightning-fast build tool |
| [Axios](https://axios-http.com/) | HTTP client for API requests |
| [Zod](https://zod.dev/) | Input validation |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express](https://expressjs.com/) | Web framework |
| [Prisma ORM](https://www.prisma.io/) | Database toolkit |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
| [JWT](https://jwt.io/) | Authentication tokens |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Password hashing |
| [Zod](https://zod.dev/) | Schema validation |
| [CORS](https://www.npmjs.com/package/cors) | Cross-origin resource sharing |
| [Dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |

---

## 📦 Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account with a cluster created

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/API/` with the following:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@CLUSTER.mongodb.net/NOME_DO_BANCO?retryWrites=true&w=majority&appName=NOME"
JWT_SECRET="your_secret_here"
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5174
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/EduhxH/fullstack-crud.git
cd fullstack-crud
```

### 2. Start the Backend

```bash
cd backend/API
npm install
npx prisma generate
npm run dev
```

> ✅ API running at `http://localhost:3000`

### 3. Start the Frontend

```bash
cd frontend/cadastro
npm install
npm run dev
```

> ✅ App running at `http://localhost:5174`

---

## 🔌 API Reference

Base URL: `http://localhost:3000`

### Auth

#### Register admin
```http
POST /auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "123456"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "123456"
}
```

> All `/usuarios` routes require `Authorization: Bearer <token>` header.

### Users

#### Get all users
```http
GET /usuarios
```

#### Filter users (with pagination)
```http
GET /usuarios?name=John&age=20&email=john@example.com&page=1&limit=5
```

#### Create a user
```http
POST /usuarios
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": "20"
}
```

#### Update a user
```http
PUT /usuarios/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john@example.com",
  "age": "21"
}
```

#### Delete a user
```http
DELETE /usuarios/:id
```

#### Health check
```http
GET /health
```

### Comments

> These routes are **public** — no authentication required.

#### Get all comments
```http
GET /comentarios
```

#### Post a comment
```http
POST /comentarios
Content-Type: application/json

{
  "texto": "Your comment here"
}
```

---

## 📁 Project Structure

```
fullstack-crud/
│
├── backend/
│   └── API/
│       ├── prisma/
│       │   └── schema.prisma       # Database schema
│       ├── server.js               # Express app, routes & middleware
│       ├── .env                    # Environment variables (not committed)
│       └── package.json
│
└── frontend/
    └── cadastro/
        ├── src/
        │   ├── assets/             # Static assets (including the photo 📸)
        │   ├── pages/
        │   │   ├── home/           # Main dashboard page
        │   │   ├── foto/           # Photo gallery + comment system
        │   │   └── login/          # Login & register page
        │   ├── services/
        │   │   └── api.js          # Axios instance
        │   ├── index.css           # Global styles
        │   └── main.jsx            # App entry point
        └── package.json
```

---

## 🧠 What I Learned

- Structuring a full-stack project with separate frontend and backend
- Building and consuming a REST API with Express and Axios
- Using Prisma ORM with MongoDB for type-safe database operations
- Implementing JWT authentication with protected routes
- Hashing passwords securely with bcryptjs
- Validating schemas on both layers with Zod
- Managing React state with `useState` and `useRef`
- Handling async operations and error boundaries in both layers
- Deploying a Node.js backend to Render with environment variables
- Organizing a monorepo-style project and versioning it with Git
- Debugging CORS issues between a Vercel frontend and a Render backend
- Building public (unauthenticated) endpoints alongside protected routes
- Creating a real-time comment system with persistent storage

---

<div align="center">

Made with 💜 by [EduhxH](https://github.com/EduhxH)

</div>
