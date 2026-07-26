# 🎥 Video Referencing Platform

A full-stack video referencing and meeting management platform built with **Next.js**, **FastAPI**, **SQLAlchemy**, and **JWT Authentication**. Users can securely register, log in, create meetings, join meetings, and manage their meeting history through a modern and responsive interface.

---

## 🚀 Live Demo

### Frontend
https://video-refrencing-platform.vercel.app

### Backend API (Swagger)
https://video-refrencing-platform.onrender.com/docs

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Secure Password Hashing using Passlib & Bcrypt
- Protected Routes

### Meeting Management
- Create New Meetings
- Join Existing Meetings
- View Upcoming Meetings
- View Recent Meetings
- End Meetings
- Copy Meeting Links

### Dashboard
- Personalized Dashboard
- Meeting History
- Responsive UI
- User Profile Section

### Security
- JWT Authentication
- Password Hashing
- CORS Configuration
- Input Validation using Pydantic

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

## Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Passlib
- Bcrypt
- Python-JOSE (JWT)

## Deployment
- Frontend: Vercel
- Backend: Render

---

# 📂 Project Structure

```
Video-Refrencing-Platform/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── crud/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Video-Refrencing-Platform.git
cd Video-Refrencing-Platform
```

---

# Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

Swagger API

```
http://localhost:8000/docs
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# Environment Variables

## Backend (.env)

```env
DATABASE_URL=sqlite:///./zoom.db
```

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:

```env
NEXT_PUBLIC_API_URL=https://video-refrencing-platform.onrender.com
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login User |

---

## Meetings

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/meetings/` | Get Meetings |
| POST | `/meetings/create` | Create Meeting |
| PUT | `/meetings/{id}` | Update Meeting |
| DELETE | `/meetings/{id}` | Delete Meeting |

---

# Authentication Flow

1. Register a new account
2. Login with email and password
3. Receive JWT access token
4. Store token on frontend
5. Access protected APIs using Authorization header

---

# Screenshots

Add screenshots here after deployment.

Example:

```
screenshots/
    login.png
    dashboard.png
    create-meeting.png
```

---

# Deployment

## Backend

Hosted on **Render**

https://video-refrencing-platform.onrender.com

---

## Frontend

Hosted on **Vercel**

https://video-refrencing-platform.vercel.app

---

# Challenges Solved

- JWT Authentication
- Password Hashing with Passlib & Bcrypt
- FastAPI Deployment on Render
- Next.js Deployment on Vercel
- Cross-Origin Resource Sharing (CORS)
- Environment Variable Configuration
- API Integration
- Pydantic Validation
- Production Deployment Debugging

---

# Future Improvements

- PostgreSQL Database
- Docker Support
- GitHub Actions CI/CD
- Email Verification
- Forgot Password
- Refresh Tokens
- Role-Based Access Control
- Meeting Notifications
- WebRTC-based Real-Time Video & Audio Communication

---

# Author

**Kavya Dari**

LinkedIn: https://www.linkedin.com/in/kavya-dari-2707792a7/

GitHub: https://github.com/YOUR_GITHUB_USERNAME

---

# License

This project is developed for learning, portfolio, and educational purposes.
