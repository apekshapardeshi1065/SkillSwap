# SkillSwap – MERN Stack Application

SkillSwap is a full-stack MERN application that allows users to exchange skills with each other.  
The project focuses on secure authentication, a modern dashboard UI, dark mode support, and a responsive layout with sidebar and navbar.
# Features

- User Registration & Login
- JWT Based Authentication
- Secure User Dashboard
- Dark Mode / Light Mode Toggle
- Responsive Sidebar & Navbar
- Protected Routes
- Clean & Modern UI
- MongoDB Database Integration


## Tech Stack

🔹Frontend

- React.js
- Context API / Redux (if used)
- Tailwind CSS / CSS / Bootstrap
  
🔹Backend
- Node.js
- Express.js
  
🔹Database
- MongoDB
  
🔹Authentication
- JSON Web Token (JWT)


Folder Structure
-------

SkillSwap/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   │
│   ├── controllers/
│   │   └── authController.js     # Authentication logic
│   │
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── authMiddleware.js     # Protected routes
│   │
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Request.js            # Skill request schema
│   │
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── user.js               # User routes
│   │   ├── request.js            # Skill request routes
│   │   └── dashboard.js          # Dashboard routes
│   │
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                 # Backend entry point
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation bar
│   │   │   └── Sidebar.js        # Sidebar
│   │   │
│   │   ├── context/
│   │   │   └── ThemeContext.js   # Dark/Light mode
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Profile.js
│   │   │   ├── Skills.js
│   │   │   ├── Requests.js
│   │   │   ├── Users.js
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Profile.css
│   │   │   ├── Skills.css
│   │   │   ├── Requests.css
│   │   │   └── Users.css
│   │   │
│   │   ├── services/
│   │   │   └── api.js            # API calls
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│
├── .gitignore
└── README.md


Installation & Setup
----------

1 Backend (Development Mode)
------

Navigate to the backend directory and start the server:

cd backend

npm install

npm run dev

Starts the backend server using nodemon

Server runs on: http://localhost:5000 (or your configured port)


2 Frontend
----------

Navigate to the frontend directory and start the React application:

cd frontend

npm install

npm start

Starts the React development server

Application runs on: http://localhost:3000


3 Environment Variables(Backend)
-----
Create a `.env` file inside the backend folder:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret


