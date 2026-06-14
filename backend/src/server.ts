import express from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { authController } from './controllers/authController.js';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const port = Number(process.env.PORT ?? 4000);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});