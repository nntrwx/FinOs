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
```

Create a `.env` file in `backend` and add your database connection string:

You can find an example in the `.env.example` file

```bash
# Format: postgresql://user:password@localhost:5432/database_name
PORT=4000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/your_db_name"
JWT_SECRET="some_text"
```

Initialize the database and generate the Prisma client:

```bash
npx prisma db push
npx prisma generate
```

Start the server:

```bash
npm run dev
```

The API runs on [http://localhost:4000](http://localhost:4000). Health check: [http://localhost:4000/health](http://localhost:4000/health).

## Structure

The repository is now organized as a simple two-app workspace. Frontend and backend can be developed and deployed independently.
