# 🚀 ResolveHub

### Smart Complaint Management System

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-4-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
</p>

<p align="center">
  <b>A full-stack complaint management platform for submitting, tracking, managing, and resolving complaints efficiently.</b>
</p>

<p align="center">
  <a href="https://resolve-hub-sooty.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_App-black?style=for-the-badge" />
  </a>
  &nbsp;
  <a href="https://github.com/twisha-patel17/ResolveHub">
    <img src="https://img.shields.io/badge/💻_GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

---

## 📌 Overview

**ResolveHub** is a full-stack complaint management system designed to provide a structured and transparent platform where users can submit complaints and administrators can efficiently manage, track, respond to, and resolve them.

The application provides a centralized workflow for complaint submission and resolution while giving users visibility into the progress of their complaints.

### Core Capabilities

* 🔐 Secure authentication
* 👥 Role-based access control
* 📝 Complaint creation and management
* ⚡ Real-time updates using Socket.IO
* 📊 Complaint status and priority tracking
* 💬 Admin replies and complaint communication
* 🛠️ Admin dashboard and user management
* 🔎 Search, filtering, and pagination
* 👤 Profile management
* 🖼️ Image uploads using Cloudinary
* 📱 Responsive user interface
* ☁️ Separate frontend and backend deployment

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Role-based access control
* Protected routes
* Separate user and administrator capabilities

### 📝 Complaint Management

* Create new complaints
* View complaint details
* Track complaint status
* Set and manage complaint priority
* Update complaint status
* Add replies to complaints
* View complaint history
* Upload complaint-related images

### ⚡ Real-Time Communication

ResolveHub uses **Socket.IO** to provide real-time complaint updates.

When relevant complaint data changes, connected clients can receive updates without requiring a manual page refresh.

```text
Admin updates complaint
        │
        ▼
Backend processes update
        │
        ▼
Socket.IO emits event
        │
        ▼
Connected client receives event
        │
        ▼
UI updates automatically
```

This provides a more responsive complaint tracking and administration experience.

### 🛠️ Admin Dashboard

Administrators can:

* View complaints
* Manage complaint statuses
* Update priorities
* Reply to complaints
* Manage users
* Monitor complaint activity
* Search and filter records
* Access complaint details

### 🔎 Search, Filtering & Pagination

* Search complaints and users
* Filter complaints based on relevant properties
* Paginate large datasets
* Efficiently retrieve server-side data

### 👤 User Profile

* View profile information
* Update profile details
* Manage account information

### 🎨 UI & User Experience

* Responsive design
* Mobile-friendly interface
* Skeleton loading states
* Loading indicators
* Error handling
* Status badges
* Priority indicators
* Clean dashboard interface

### 🖼️ Image Uploads

Complaint images are uploaded and stored using **Cloudinary**, allowing users to attach relevant visual information to their complaints.

---

# 🛠️ Tech Stack

## Frontend

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />
</p>

* React
* Vite
* Tailwind CSS
* Axios
* TanStack Query
* React Router
* Lucide React

## Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-4-010101?style=flat-square&logo=socket.io&logoColor=white" />
</p>

* Node.js
* Express.js
* REST APIs
* Socket.IO

## Database

<p>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white" />
</p>

* MongoDB
* Mongoose
* MongoDB Atlas

## Authentication & Security

<p>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/bcrypt-338?style=flat-square" />
</p>

* JWT
* bcrypt
* Protected routes
* Role-based authorization

## File Storage

* Cloudinary

## Deployment

<p>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
</p>

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database
* Cloudinary — Image Storage

## Development Tools

* Git
* GitHub
* Postman
* VS Code

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        USER          │
                         │     Web Browser      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   REACT FRONTEND     │
                         │        Vite          │
                         │    Tailwind CSS      │
                         └──────────┬───────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │                             │
                     ▼                             ▼
            ┌─────────────────┐          ┌─────────────────┐
            │    REST APIs    │          │    Socket.IO    │
            │     Axios       │          │ Real-time Events│
            └────────┬────────┘          └────────┬────────┘
                     │                            │
                     └──────────────┬─────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │   NODE.JS +          │
                         │   EXPRESS.JS         │
                         └──────────┬───────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │                             │
                     ▼                             ▼
            ┌─────────────────┐          ┌─────────────────┐
            │     MONGODB     │          │    CLOUDINARY   │
            │     Database    │          │  Image Storage  │
            └─────────────────┘          └─────────────────┘
```

---

# 🔄 Application Flow

## 👤 User Flow

```text
Register / Login
       │
       ▼
   Dashboard
       │
       ▼
Create Complaint
       │
       ▼
Complaint Submitted
       │
       ▼
Track Complaint Status
       │
       ▼
Receive Updates / Replies
       │
       ▼
Complaint Resolved
```

## 👨‍💼 Admin Flow

```text
Admin Login
     │
     ▼
Admin Dashboard
     │
     ▼
View Complaints
     │
     ├───────────────┐
     ▼               ▼
Update Status   Update Priority
     │               │
     └───────┬───────┘
             ▼
       Reply to User
             │
             ▼
      Real-Time Update
             │
             ▼
       Resolve Complaint
```

---

# 📊 Complaint Lifecycle

ResolveHub uses a structured complaint status workflow:

```text
┌─────────┐
│ Pending │
└────┬────┘
     │
     ▼
┌──────────────┐
│ In Progress  │
└──────┬───────┘
       │
       ▼
┌──────────┐
│ Resolved │
└──────────┘
```

A complaint may also be marked as:

```text
Rejected
```

This allows users to clearly understand the current state of their complaint.

---

# ⚡ Real-Time Updates with Socket.IO

One of the key technical features of ResolveHub is real-time communication.

Instead of relying entirely on repeated API requests or manual page refreshes, Socket.IO is used to communicate relevant updates between the server and connected clients.

### Example

```text
Admin changes complaint
          │
          ▼
Backend processes update
          │
          ▼
Socket.IO emits event
          │
          ▼
Connected client receives event
          │
          ▼
UI updates automatically
```

This provides a more responsive complaint management experience.

---

# 🔄 Server State Management

ResolveHub uses **TanStack Query** for managing server-side data.

It handles:

* API data fetching
* Caching
* Loading states
* Error states
* Query invalidation
* Server-state synchronization

This helps keep server-state logic separate from local UI state and makes API-driven components easier to manage.

---

# 🔐 Authentication

Authentication is implemented using **JWT-based authentication**.

### Authentication Flow

```text
User Login
    │
    ▼
Credentials Verified
    │
    ▼
JWT Generated
    │
    ▼
Token Stored on Client
    │
    ▼
Authenticated API Requests
    │
    ▼
Protected Backend Routes
```

Passwords are securely hashed using **bcrypt** before being stored in the database.

Protected routes ensure that users can only access resources permitted by their role.

---

# 🌐 API Architecture

The backend follows a RESTful API architecture.

### Main API Groups

```text
/api/auth
/api/users
/api/complaints
```

### Example Operations

```http
POST    /api/auth/register
POST    /api/auth/login

GET     /api/complaints
GET     /api/complaints/:id
POST    /api/complaints
PATCH   /api/complaints/:id
DELETE  /api/complaints/:id
```

> **Note:** Exact routes may vary depending on the current backend implementation.

---

# 📁 Project Structure

## Frontend

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

## Backend

```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── socket/
├── utils/
├── server.js
├── .env
└── package.json
```

---

# ⚙️ Environment Variables

## Frontend

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=your_backend_api_url
```

## Backend

Create a `.env` file inside the backend directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ **Never commit `.env` files or expose secret credentials in the repository.**

---

# 💻 Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/twisha-patel17/ResolveHub.git
cd ResolveHub
```

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

## 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

## 4. Configure Environment Variables

Create the required `.env` files in the frontend and backend directories.

## 5. Start the Backend

```bash
npm run dev
```

## 6. Start the Frontend

```bash
npm run dev
```

The application should now be available locally.

---

# ☁️ Deployment

ResolveHub uses separate deployment services for the frontend and backend.

| Layer        | Technology        | Deployment    |
| ------------ | ----------------- | ------------- |
| Frontend     | React + Vite      | Vercel        |
| Backend      | Node.js + Express | Render        |
| Database     | MongoDB           | MongoDB Atlas |
| File Storage | Cloudinary        | Cloudinary    |

---

# 📚 Key Learning Outcomes

Through ResolveHub, I gained practical experience with:

* Building a complete MERN application
* Designing RESTful APIs
* Implementing JWT authentication
* Role-based authorization
* MongoDB schema design with Mongoose
* Real-time communication using Socket.IO
* Server-state management with TanStack Query
* API integration using Axios
* Cloudinary image uploads
* Search, filtering and pagination
* Loading and error states
* Frontend/backend integration
* Production deployment
* Environment variable management
* Debugging full-stack applications

---

# 🎯 Project Goals

The primary goals of ResolveHub were to:

1. Build a practical full-stack application.
2. Strengthen MERN stack development skills.
3. Learn real-time communication using Socket.IO.
4. Improve understanding of authentication and authorization.
5. Practice server-state management with TanStack Query.
6. Gain experience deploying a production-style application.
7. Build a project around a realistic problem.

---

# 🌐 Live Demo

<p align="center">
  <a href="https://resolve-hub-sooty.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Open_ResolveHub-000000?style=for-the-badge" />
  </a>
</p>

**Live Application:**
https://resolve-hub-sooty.vercel.app/

---

# 💻 GitHub Repository

<p align="center">
  <a href="https://github.com/twisha-patel17/ResolveHub">
    <img src="https://img.shields.io/badge/⭐_GitHub-View_Repository-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

**Repository:**
https://github.com/twisha-patel17/ResolveHub

---

# 👩‍💻 Author

## Twisha Patel

**B.Tech Computer Engineering Student | Full-Stack Developer**

Passionate about building full-stack applications, learning modern web technologies, and solving real-world problems through software.

<p align="center">
  <a href="https://github.com/twisha-patel17">
    <img src="https://img.shields.io/badge/GitHub-twisha--patel17-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

---

# 📄 License

This project was created for educational and portfolio purposes.

---

<p align="center">
  ⭐ <b>If you found ResolveHub interesting, consider giving the repository a star!</b>
</p>

<p align="center">
  <b>Built with ❤️ by Twisha Patel</b>
</p>
```
