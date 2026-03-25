<div align="center">

<img src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/node.js-v24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/mongodb-atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />

<br/>
<br/>

# 👤 Fullstack CRUD — User Management System

**A complete full-stack application for user registration, listing, filtering and deletion.**  
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
| Delete users | ✅ |
| Frontend consuming REST API via Axios | ✅ |
| Persistent data with MongoDB Atlas | ✅ |

---

## ✨ Features

- 📋 **User listing** — fetches and displays all registered users in real time
- 🔍 **Dynamic filtering** — filter users by name, age or email via query params
- ➕ **User registration** — form that sends data to the API and updates the list instantly
- 🗑️ **User deletion** — remove users with a single click, reflected immediately in the UI
- 🌐 **REST API** — clean and organized Express endpoints
- 🗄️ **Prisma ORM** — type-safe database access with schema-first modeling
- ☁️ **MongoDB Atlas** — cloud-hosted database, zero local setup required

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [Vite](https://vitejs.dev/) | Lightning-fast build tool |
| [Axios](https://axios-http.com/) | HTTP client for API requests |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express](https://expressjs.com/) | Web framework |
| [Prisma ORM](https://www.prisma.io/) | Database toolkit |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
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

Create a `.env` file inside `backend/API/` and add your MongoDB connection string:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@CLUSTER.mongodb.net/NOME_DO_BANCO?appName=NOME"
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

> ✅ App running at `http://localhost:5173`

---

## 🔌 API Reference

Base URL: `http://localhost:3000`

### Get all users
```http
GET /usuarios
```

### Filter users
```http
GET /usuarios?name=John&age=20&email=john@example.com
```

### Create a user
```http
POST /usuarios
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": "20"
}
```

### Delete a user
```http
DELETE /usuarios/:id
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
│       ├── generated/prisma/       # Prisma generated client
│       ├── server.js               # Express app & routes
│       ├── .env                    # Environment variables (not committed)
│       └── package.json
│
└── frontend/
    └── cadastro/
        ├── src/
        │   ├── assets/             # Static assets
        │   ├── pages/home/
        │   │   ├── index.jsx       # Main page component
        │   │   └── style.css       # Page styles
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
- Managing React state with `useState` and `useRef`
- Handling async operations and error boundaries in both layers
- Organizing a monorepo-style project and versioning it with Git

---

## 🔮 Future Improvements

- [ ] Edit user (PUT route)
- [ ] Input validation with Zod
- [ ] Authentication with JWT
- [ ] Pagination for the user list
- [ ] Deployment (Railway + Vercel)

---

<div align="center">

Made with 💜 by [EduhxH](https://github.com/EduhxH)

</div>
