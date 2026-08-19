# 🚀 ResolveHub

### Smart Complaint Management System

<p align="center">
  <img src="https://img.shields.io/badge/React-2026-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-REST%20API-black?logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-black?logo=socket.io" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/JWT-Authentication-purple?logo=jsonwebtokens" alt="JWT" />
  <img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-blue?logo=cloudinary" alt="Cloudinary" />
</p>

<p align="center">
  A full-stack complaint management platform designed to make complaint submission, tracking, communication, and resolution more structured, transparent, and efficient.
</p>

---

## 📌 Overview

**ResolveHub** is a full-stack complaint management system built using the MERN stack with real-time communication capabilities.

The platform provides a centralized workflow where users can submit complaints, attach supporting images, monitor complaint progress, and communicate with administrators. Administrators receive a dedicated dashboard for reviewing complaints, updating priorities and statuses, responding to users, and managing platform activity.

The project was designed around a realistic organizational problem: **complaints often become difficult to track when information is scattered across messages, forms, or manual processes.**

ResolveHub addresses this by introducing a structured digital workflow where every complaint has a clear lifecycle, associated metadata, communication history, and current status.

### What the system provides

* Secure authentication and authorization
* Role-based user and administrator access
* Complaint creation and lifecycle management
* Complaint priority and status tracking
* Real-time updates using Socket.IO
* Admin-to-user communication
* Complaint image attachments
* Search, filtering, and pagination
* Server-state management with TanStack Query
* User profile management
* Dedicated administrative dashboard
* Responsive and mobile-friendly interface
* Cloud-based deployment

---

# ✨ Key Highlights

### Real-Time Complaint Updates

ResolveHub uses **Socket.IO** to provide real-time communication between the backend and connected clients.

When an administrator changes relevant complaint information, connected users can receive the update without relying entirely on manual refreshes.

This makes the complaint tracking experience more responsive and demonstrates practical usage of event-driven communication in a full-stack application.

### Role-Based Architecture

The application separates capabilities based on user roles.

**Users** can:

* Create complaints
* View their complaints
* Track complaint progress
* Reply to complaints
* Upload supporting images
* Manage their profile

**Administrators** can:

* View and manage complaints
* Update complaint status
* Change complaint priority
* Respond to users
* Manage users
* Search and filter records
* Monitor complaint activity

This ensures that sensitive administrative operations are protected from unauthorized users.

### Structured Complaint Lifecycle

Every complaint follows a defined workflow:

```text
Pending
   │
   ▼
In Progress
   │
   ▼
Resolved
```

A complaint can also be marked as:

```text
Rejected
```

This gives users a clear understanding of where their complaint currently stands instead of treating every complaint as an unstructured support request.

---

# 🧩 Core Features

## 🔐 Authentication & Authorization

ResolveHub implements JWT-based authentication with password hashing and protected backend routes.

Features include:

* User registration
* User login
* JWT authentication
* Password hashing using bcrypt
* Protected routes
* Role-based authorization
* Separate user and administrator capabilities

Authentication is enforced at the backend level so that access restrictions are not dependent only on frontend UI visibility.

---

## 📝 Complaint Management

Users can create and track complaints through a structured complaint workflow.

Each complaint can contain information such as:

* Title
* Description
* Category/details
* Priority
* Status
* Attached images
* Replies
* Timestamps
* Associated user information

Administrators can update complaint information as the complaint moves through the resolution process.

---

## ⚡ Real-Time Communication

Socket.IO is used for real-time communication between the server and connected clients.

A simplified update flow looks like this:

```text
Administrator
      │
      │ Updates complaint
      ▼
Backend API
      │
      │ Processes change
      ▼
Socket.IO Event
      │
      ▼
Connected Client
      │
      ▼
UI reflects update
```

This reduces the dependency on constant manual refreshing and demonstrates how WebSockets can complement traditional REST APIs.

---

## 🛠️ Admin Dashboard

The administrator dashboard provides a centralized interface for managing the complaint ecosystem.

Administrators can:

* View complaints
* Inspect complaint details
* Update status
* Update priority
* Reply to users
* Manage users
* Search records
* Filter complaints
* Navigate through paginated data

The dashboard is designed around the workflow of an administrator rather than simply exposing raw database records.

---

## 🔎 Search, Filtering & Pagination

ResolveHub supports server-side data operations for working with larger collections of complaints and users.

The application provides:

* Search
* Filtering
* Pagination
* Server-side data retrieval
* Query-based data fetching

These features make the application more scalable than loading every record into the browser at once.

---

## 🖼️ Image Uploads

Users can attach images to complaints when visual information is useful for explaining an issue.

Images are uploaded and managed through **Cloudinary**, while the relevant image reference is associated with the complaint.

This separates application data from file storage and avoids unnecessarily storing image binaries directly inside MongoDB.

---

## 👤 User Profile

Users can manage their account information through their profile.

The profile functionality includes:

* Viewing account information
* Updating profile details
* Managing account-related information

---

## 🎨 User Experience

The frontend focuses on providing clear feedback throughout the application.

UI features include:

* Responsive layouts
* Mobile-friendly design
* Loading indicators
* Skeleton loading states
* Error handling
* Status badges
* Priority indicators
* Dashboard views
* Empty states
* Clean navigation

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
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
           ┌─────────────────┐             ┌─────────────────┐
           │    REST APIs    │             │    Socket.IO    │
           │     Axios       │             │ Real-Time Events│
           └────────┬────────┘             └────────┬────────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │   NODE.JS +          │
                         │   EXPRESS.JS         │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
           ┌─────────────────┐             ┌─────────────────┐
           │     MONGODB     │             │    CLOUDINARY   │
           │     Database    │             │  Image Storage  │
           └─────────────────┘             └─────────────────┘
```

### Architecture Approach

The application separates responsibilities across the frontend, backend, database, and external file storage.

**Frontend** handles presentation, user interaction, routing, and server-state consumption.

**Backend** manages authentication, authorization, business logic, API endpoints, validation, and real-time events.

**MongoDB** stores application data such as users and complaints.

**Cloudinary** handles image storage and delivery.

**Socket.IO** provides event-driven communication for real-time updates.

This separation keeps the application modular and makes individual components easier to maintain and extend.

---

# 🔄 Application Workflow

## User Workflow

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
Administrator Reviews
       │
       ▼
Track Status & Replies
       │
       ▼
Complaint Resolved
```

## Administrator Workflow

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

# ⚡ Real-Time Architecture

ResolveHub combines **REST APIs and Socket.IO** instead of attempting to use one communication mechanism for everything.

REST APIs are used for standard request-response operations such as:

* Authentication
* Creating complaints
* Fetching complaints
* Updating complaint information
* Managing users

Socket.IO is used where real-time communication improves the experience.

```text
             Client
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
   REST API          Socket.IO
       │                 │
       ▼                 ▼
   Request/Response   Events
       │                 │
       └────────┬────────┘
                ▼
             Server
```

This hybrid approach allows the application to use conventional HTTP APIs for persistent operations while using real-time events for time-sensitive UI updates.

---

# 🔄 Server-State Management

ResolveHub uses **TanStack Query** to manage server-side data.

Instead of manually maintaining API loading, error, caching, and synchronization logic throughout individual components, TanStack Query provides a centralized approach to server-state management.

It is used for:

* Data fetching
* Caching
* Loading states
* Error states
* Query invalidation
* Refetching
* Server-state synchronization

This improves the separation between **server state** and **local UI state** and makes data-driven React components easier to maintain.

---

# 🔐 Security & Authentication

Authentication is implemented using **JSON Web Tokens (JWT)**.

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
Authenticated Request
    │
    ▼
Backend Authentication Middleware
    │
    ▼
Protected Resource
```

Passwords are hashed using **bcrypt** before being stored.

Backend middleware is responsible for validating authentication and enforcing role-based permissions.

Environment variables are used for sensitive configuration such as database credentials, JWT secrets, and Cloudinary credentials.

---

# 🌐 REST API Architecture

The backend follows a REST-oriented API structure.

### Main API Groups

```text
/api/auth
/api/users
/api/complaints
```

### Representative Operations

```text
POST    /api/auth/register
POST    /api/auth/login

GET     /api/complaints
GET     /api/complaints/:id
POST    /api/complaints
PATCH   /api/complaints/:id
DELETE  /api/complaints/:id
```

> Routes may vary depending on the current implementation.

The API layer separates HTTP request handling from business logic through controllers, middleware, services, and data models.

---

# 🛠️ Tech Stack

| Category            | Technologies              |
| ------------------- | ------------------------- |
| Frontend            | React, Vite, Tailwind CSS |
| State Management    | TanStack Query            |
| Routing             | React Router              |
| HTTP Client         | Axios                     |
| UI Icons            | Lucide React              |
| Backend             | Node.js, Express.js       |
| Real-Time           | Socket.IO                 |
| Database            | MongoDB, Mongoose         |
| Database Hosting    | MongoDB Atlas             |
| Authentication      | JWT, bcrypt               |
| File Storage        | Cloudinary                |
| Frontend Deployment | Vercel                    |
| Backend Deployment  | Render                    |
| API Testing         | Postman                   |
| Version Control     | Git, GitHub               |
| Development         | VS Code                   |

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

The project structure follows a modular approach where routing, controllers, models, middleware, services, and real-time functionality have separate responsibilities.

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

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Security:** Never commit `.env` files, API keys, database credentials, JWT secrets, or other sensitive configuration to GitHub.

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

Create the required `.env` files for the frontend and backend.

Make sure the frontend API URL points to the backend server.

## 5. Start the Backend

```bash
npm run dev
```

## 6. Start the Frontend

```bash
npm run dev
```

The frontend and backend will run independently during local development.

---

# ☁️ Deployment

ResolveHub uses separate services for different application layers.

| Layer        | Technology        | Deployment    |
| ------------ | ----------------- | ------------- |
| Frontend     | React + Vite      | Vercel        |
| Backend      | Node.js + Express | Render        |
| Database     | MongoDB           | MongoDB Atlas |
| File Storage | Cloudinary        | Cloudinary    |

This deployment structure keeps the frontend, backend, database, and file storage independently managed.

---

# 📚 What I Learned

Building ResolveHub provided practical experience across the complete full-stack development lifecycle.

### Backend Development

* Designing REST APIs
* Structuring Express applications
* Creating controllers and middleware
* MongoDB schema design with Mongoose
* Authentication and authorization
* API validation and error handling

### Frontend Development

* Building reusable React components
* Managing server state with TanStack Query
* Implementing protected routes
* Handling asynchronous API operations
* Designing responsive interfaces
* Managing loading and error states

### Real-Time Systems

* Understanding WebSocket-based communication
* Implementing Socket.IO events
* Synchronizing backend changes with connected clients
* Combining REST APIs with real-time events

### Deployment & Production Concepts

* Deploying frontend applications
* Deploying backend APIs
* Connecting cloud-hosted databases
* Managing environment variables
* Integrating external cloud services
* Debugging deployed applications

---

# 🎯 Project Objectives

ResolveHub was built with the following objectives:

1. Build a complete full-stack application around a realistic problem.
2. Strengthen MERN stack development skills.
3. Implement secure authentication and role-based authorization.
4. Understand real-time communication using Socket.IO.
5. Practice effective server-state management.
6. Work with cloud-based database and file-storage services.
7. Gain experience integrating frontend and backend systems.
8. Deploy a complete application using modern cloud platforms.
9. Improve understanding of production-oriented application architecture.

---

# 🌐 Live Demo

**Live Application:**
https://resolve-hub-sooty.vercel.app/

---

# 💻 GitHub Repository

**Source Code:**
https://github.com/twisha-patel17/ResolveHub

---

# 👩‍💻 Author

## Twisha Patel

**Computer Engineering Student | Full-Stack Developer**

I enjoy building practical software applications, exploring modern web technologies, and turning real-world problems into usable digital solutions.

### Connect

* GitHub: https://github.com/twisha-patel17

---

# 📄 License

This project was created for educational and portfolio purposes.
