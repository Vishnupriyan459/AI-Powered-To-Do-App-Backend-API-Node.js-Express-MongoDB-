# 🔧 AI-Powered To-Do – Backend API (Node.js + Express + MongoDB)

This repository contains the backend REST API for the **AI-Powered To-Do Application**, enabling user authentication, secure CRUD task management, and AI-driven task recommendations.  
The API is built using **Node.js**, **Express**, **MongoDB**, and deployed on **Render**.

---

## 🌍 Live Backend URL
🔗 https://your-render-backend-url/api  
(Replace this when adding to GitHub)

---

## 🧠 Features
- User authentication with JWT (signup, login)
- Auth-protected CRUD operations for tasks
- MongoDB storage using Mongoose
- RESTful structured API endpoints
- AI Recommendation endpoint (`/ai/recommend`)  
  Suggests tasks based on completed or frequently added items

---

## 🏗️ Tech Stack
| Layer | Technology |
|-------|------------|
| Server | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (Bearer Token) |
| Deployment | Render |
| AI Logic | groq Ai infrastructure Suggestion engine using prompt logic or external AI |

---

## 📂 Project Structure
/server \
├── controllers/ #  API business logic \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──AuthController.js \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──groqHelper.js \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── taskController.js \
├── routes/ # Express routes  \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──authRoutes.js \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── taskRoutes.js \
├── models/ # Mongoose schemas   \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──Task.js \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── User.js \
├── middleware/ # Auth middleware \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── auth.js \
├── server.js # main entry point \
└── config/ # DB connection config \
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── db.js \

### 🔐 Auth
| Method | Route | Description | Auth |
|--------|--------|-------------|------|
| POST | /api/auth/signup | Register user | No |
| POST | /api/auth/login | Login & get token | No |

### 📝 Tasks
| Method | Route | Description | Auth |
|--------|--------|-------------|------|
| POST | /api/tasks | Create task | Yes |
| GET | /api/tasks | Get all tasks | Yes |
| GET | /api/tasks/:id | Get task by id | Yes |
| POST | /api/tasks/:id/subtasks | Add subtasks | Yes |
| PUT | /api/tasks/:taskId/subtasks/:index/toggle | Toggle subtask | Yes |
| PUT | /api/tasks/:id/toggle | Complete / undo task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |
| DELETE | /api/tasks/:taskId/subtasks/:index | Delete subtask | Yes |
| PUT | /api/tasks/:id/subtasks/reset | Reset subtasks | Yes |
| PUT | /api/tasks/complete/all | Mark all tasks as complete | Yes |

## 🗄️ Data Structure (MongoDB Models)

The backend uses **Mongoose** schemas to structure user and task data inside MongoDB.

---

### 👤 User Model
Stores user account information used for authentication and task ownership.

```js
User {
  _id: ObjectId,
  fullName: String,       // user's full name
  email: String,          // unique, required
  password: String,       // hashed password
  createdAt: Date,
  updatedAt: Date
}

### 📝 Task Model (MongoDB – Mongoose Schema)

```js
Task {
  _id: ObjectId,
  userId: String,           // reference to User (_id)
  title: String,            // task title
  description: String,      // task details
  reminder: Date,           // optional reminder
  completed: Boolean,       // whether task is finished
  subtasks: [
    {
      text: String,         // subtask text
      completed: Boolean    // status of subtask
    }
  ],
  createdAt: Date,
  updatedAt: Date
}

### If you need help or want to collaborate, just drop me a message 😊

