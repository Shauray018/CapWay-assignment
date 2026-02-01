# CapWay Assignment

Full-stack app built with **Next.js (frontend)** and **Node.js + Express (backend)**.

---

## Live URLs

- Frontend: https://cap-way-assignment.vercel.app/
- Backend: https://capway-assignment-production.up.railway.app


---

## Tech Stack

- Frontend: Next.js
- Backend: Node.js, Express
- Database: MongoDB
- Auth: JWT

---

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Create .env.local:
```bash
API_BASE_URL=https://capway-assignment-production.up.railway.app/api
```

### Backend
```bash
cd backend
npm install
npm run dev
```
Create .env:
```bash
MONGODB_URI=your-mongoDB-uri
JWT_SECRET=some-secret
```
