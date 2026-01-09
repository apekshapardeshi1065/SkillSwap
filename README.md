# SkillSwap – MERN Stack Application
SkillSwap is a full-stack MERN application that allows users to register, log in, and manage skills through a modern dashboard interface. The project focuses on clean UI, authentication, and scalable backend architecture.

Tech Stack
----
 1. React

 2. Node.js
 
 3. Express.js

 4. MongoDB

 5. Mongoose

 6. JWT Authentication

Features
-----
 1. User Authentication (Register & Login)

 2. User Dashboard

 3. Navbar & Sidebar Navigation

 4. Dark / Light Mode Toggle

 5. User Profile Management

 6. Protected Routes

 7. REST API Integration


File Structure (Copy-Paste Ready)
----
```bash
SKILLSWAP/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   │
│   ├── controllers/
│   │   └── authController.js      # Authentication logic
│   │
│   ├── middleware/
│   │   ├── auth.js                # JWT verification
│   │   └── authMiddleware.js      # Route protection
│   │
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Request.js             # Skill request schema
│   │
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   ├── dashboard.js           # Dashboard routes
│   │   ├── request.js             # Skill request routes
│   │   └── user.js                # User routes
│   │
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── server.js                  # Express server entry
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   └── Sidebar.js
│       │
│       ├── context/
│       │   └── ThemeContext.js    # Dark mode context
│       │
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── Profile.js
│       │   ├── Skills.js
│       │   ├── Requests.js
│       │   └── Users.js
│       │
│       ├── services/
│       │   └── api.js             # API service layer
│       │
│       └── index.js
│
├── README.md
└── package.json

```
Installation & Setup
---
1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/skillswap.git
cd skillswap
```
2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside the backend folder:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
Start the backend server:
```bash
npm run dev
```
Backend will run on:
```bash
http://localhost:5000
```

3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run start
```

Frontend will run on:
```bash
http://localhost:3000
```

🧪 API Endpoints (Overview)
----
Auth
```bash
POST /api/auth/register
```
```bash
POST /api/auth/login
```

User
```bash
GET /api/user
```

Requests
```bash
POST /api/request
GET /api/request
```


