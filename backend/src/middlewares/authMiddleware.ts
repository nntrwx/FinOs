import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided."});
        return;
    }

    try {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Access denied. Invalid token." });
    }
}