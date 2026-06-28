# # ✅ TickOff — MERN Task Tracker

A full-stack task management app built with MongoDB, Express, React, and Node.js.

## Features

- ✅ Full CRUD — Create, View, Update & Delete tasks
- ✅ Form validation (frontend + backend)
- ✅ REST API (Express + mongoose)
- ✅ MongoDB integration
- ✅ Responsive UI (mobile-first)
- ✅ Dynamic updates without page refresh (React Context + axios)
- ✅ Status, priority, due date filtering + search
- ✅ Live status change from card (no modal needed)
- ✅ Toast notifications for all actions
- ✅ Overdue date warnings

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Context, Axios |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Validation | express-validator (backend), native (frontend) |
| Notifications | react-hot-toast |

---

## Project Structure

```
task-tracker/
├── backend/
│   ├── controllers/taskController.js
│   ├── models/Task.js
│   ├── routes/tasks.js
│   ├── server.js
│   └── .env
└── frontend/
    └── src/
        ├── components/
        │   ├── FilterBar.jsx
        │   ├── StatsBar.jsx
        │   ├── TaskCard.jsx
        │   └── TaskForm.jsx
        ├── context/TaskContext.jsx
        ├── pages/Home.jsx
        ├── utils/api.js
        └── index.css
```

---

## Setup & Run

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally OR a MongoDB Atlas URI

### Step 1 — Install dependencies

```bash
# From the root task-tracker/ folder:
cd backend && npm install
cd ../frontend && npm install
```

### Step 2 — Configure environment

The backend `.env` is already created. Edit it if needed:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tasktracker
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGO_URI` with your connection string.

### Step 3 — Run both servers

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd backend
npm run dev        # uses nodemon (auto-restarts)
# OR: npm start    # without nodemon
```

```bash
# Terminal 2 — Frontend
cd frontend
npm run dev
```

App runs at: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports ?status, ?priority, ?search) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Task Schema
```json
{
  "title": "string (required, 2-100 chars)",
  "description": "string (optional, max 500 chars)",
  "status": "todo | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "ISO date string (optional)"
}
```

---

## Deployment

### Backend — Render / Railway
1. Push to GitHub
2. Create a new Web Service on Render
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables: `MONGO_URI`, `CLIENT_URL`

### Frontend — Vercel / Netlify
1. Create a new project pointing to `frontend` folder
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add env: `VITE_API_URL=https://your-backend-url.render.com`

> **Note:** For deployment, update `frontend/src/utils/api.js` to use `import.meta.env.VITE_API_URL` as the baseURL instead of `/api`.

---

## Key Design Decisions

- **React Context + useReducer** for state — no Redux needed for this scale
- **Vite proxy** forwards `/api` calls to backend in dev — no CORS issues
- **express-validator** on every write route for server-side safety
- **Mongoose validators** as a second layer of protection
- **Dynamic status update** directly from card — no modal required for quick changes
