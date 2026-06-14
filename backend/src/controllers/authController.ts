import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const authController = {
    register: async (req: Request, res: Response) => {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password and name are required.' });
        }

        if (await prisma.user.findUnique({ where: { email } })) {
            return res.status(400).json({ error: 'email already is used.' });
        }

        try {
            const user = await prisma.user.create({
                data: {
                    email: email,
                    password_hash: await bcrypt.hash(password, 10),
                    name: name
                }
            });
            const token = jwt.sign({ userId: user.id, username: user.name, email: user.email }, String(process.env.JWT_SECRET));
            return res.json({ message: 'Registration successful.', token });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password.' });
        }
        const token = jwt.sign({ userId: user.id, username: user.name, email: user.email }, String(process.env.JWT_SECRET));
        return res.json({ message: 'Login successful.', token });
    }
}
