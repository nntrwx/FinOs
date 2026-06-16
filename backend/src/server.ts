import express from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import { authenticate } from './middlewares/authMiddleware.js';
import { authController } from './controllers/authController.js';
import { transactionController } from './controllers/transactionController.js';

dotenv.config();

const port = Number(process.env.PORT ?? 4000);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.get('/api/getSummary', authenticate, transactionController.getSummary);
app.post('/api/setMonthSalary', authenticate, transactionController.setMonthSalary);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});