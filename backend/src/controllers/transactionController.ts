import { Decimal } from '@prisma/client/runtime/client';
import { prisma } from '../db.js';
import { Request, Response } from 'express';

export const transactionController = {
    getSummary: async (req: Request, res: Response) => {
        const userId = (req as any).user.userId;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    lastMonthBalance: true,
                    lastMonthExpenses: true,
                    lastMonthIncomes: true
                }
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const summary = {
                lastMonthBalance: Decimal(user.lastMonthBalance),
                lastMonthExpenses: Decimal(user.lastMonthExpenses),
                lastMonthIncomes: Decimal(user.lastMonthIncomes)
            }; 
            return res.json({ message: 'Summary retrieved successfully', summary });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error, while retrieving summary' });
        }
    },
    
    setMonthSalary: async (req: Request, res: Response) => {
        const userId = (req as any).user.userId;
        const salary: number = req.body.salary;
        if (typeof salary !== 'number' || salary < 0) {
            return res.status(400).json({ error: 'Invalid salary value. Salary must be a non-negative number.' });
        }
        try {
            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: { monthSalary: salary }
            });
            return res.json({ message: 'Month salary updated successfully', user: updatedUser });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error, while updating month salary' });
        }
    }

};