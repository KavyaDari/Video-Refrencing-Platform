# Zoom Web Clone

A production-quality video conferencing web application inspired by Zoom. Built with modern web technologies focusing on clean architecture, responsive UI, and robust backend services.

## Screenshots

![Dashboard Placeholder](/placeholders/dashboard.png)
*Figure 1: The Main Dashboard for joining and scheduling meetings.*

![Meeting Room Placeholder](/placeholders/meeting-room.png)
*Figure 2: The Dark-themed Video Meeting Room.*

## Architecture

This project strictly adheres to **Clean Architecture** principles to ensure scalability, testability, and separation of concerns.

* **Frontend**: Built with **Next.js 15 (App Router)** and **React**. The UI is constructed using **Tailwind CSS** and custom primitives inspired by **shadcn/ui**. State management and data fetching rely on React Hooks and **Axios**. Form validation is strictly enforced on the client side using **React Hook Form** and **Zod**.
* **Backend**: Powered by **FastAPI** leveraging asynchronous Python 3.11 features. 
  * **Controllers (Routers)**: Thin layers defining HTTP endpoints.
  * **Services**: Contain all core business logic (validation, orchestration).
  * **Repositories**: Abstract raw database operations.
  * **Schemas**: Pydantic models for strict I/O validation.
* **Database**: **SQLite** managed via **SQLAlchemy ORM** with **Alembic** handling migration tracking.

## Folder Structure

```text
├── frontend/                     # Next.js Application
│   ├── app/                      # App Router definitions
│   ├── components/               # React UI Components
│   │   ├── layout/               # Navbars, Wrappers
│   │   ├── meeting/              # Dashboard tiles, Modals
│   │   ├── meeting_room/         # Dark-themed Room UI
│   │   └── ui/                   # Primitive abstractions (Buttons, Cards)
│   ├── services/                 # Axios clients
│   └── styles/                   # Tailwind globals
└── backend/                      # FastAPI Application
    ├── app/
    │   ├── api/                  # Route handlers
    │   ├── core/                 # Config, Exceptions
    │   ├── database/             # SQLAlchemy Engine
    │   ├── models/               # DB Models (User, Meeting)
    │   ├── repositories/         # DB Abstraction layer
    │   ├── schemas/              # Pydantic Schemas
    │   └── services/             # Business Logic
    └── tests/                    # Pytest suite
```

## Installation

### Prerequisites
- Node.js >= 18
- Python 3.11

### 1. Running the Backend

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt # (Contains fastapi, uvicorn, sqlalchemy, alembic)
alembic upgrade head
uvicorn main:app --reload --port 8000
```

### 2. Running the Frontend

```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`.

## API Documentation

The backend automatically generates interactive Swagger documentation. When the backend is running, navigate to:
`http://localhost:8000/docs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/meetings/create` | Instantly creates a new meeting instance. |
| POST | `/meetings/schedule` | Schedules a meeting for a future date/time. |
| POST | `/meetings/join` | Validates ID and attaches a participant. |
| GET | `/meetings/upcoming` | Fetches future scheduled meetings. |
| GET | `/meetings/recent` | Fetches past meetings. |
| GET | `/{meeting_id}` | Retrieves specific meeting metadata. |

## Future Improvements

- [ ] **WebRTC Integration**: Swap the mock UI Video Tiles with actual peer-to-peer WebRTC streams using libraries like Mediasoup or LiveKit.
- [ ] **Authentication**: Implement JWT-based auth via NextAuth.js to map users to their unique scheduled meetings dynamically.
- [ ] **WebSockets**: Add real-time chat bridging using FastAPI WebSockets.
- [ ] **PostgreSQL Migration**: Swap the underlying SQLite file-based DB with a fully managed PostgreSQL instance for horizontal scaling.
