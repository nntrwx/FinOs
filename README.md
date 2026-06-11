This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
# FinOs

FinOs is split into two separate apps:

- `frontend/` - Next.js UI
- `backend/` - TypeScript Express API

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Backend

```bash
cd backend
npm install
npm run dev
```

The API runs on [http://localhost:4000](http://localhost:4000). Health check: [http://localhost:4000/health](http://localhost:4000/health).

## Structure

The repository is now organized as a simple two-app workspace. Frontend and backend can be developed and deployed independently.
