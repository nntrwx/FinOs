import { Decimal } from '@prisma/client/runtime/client';
import { prisma } from '../db.js';
import { Request, Response } from 'express';

enum TransactionType {
  INCOME,
  EXPENSE
}

enum TransactionCategory {
  FOOD,
  TRANSPORT,
  ENTERTAINMENT,
  UTILITIES,
  HEALTHCARE,
  OTHER
}

export const transactionController = {
    getMonthSummary: async (req: Request, res: Response) => {
        const userId = (req as any).user.userId;
        const dateQuery = req.query.date as string;
        const date = dateQuery ? new Date(dateQuery) : new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1);
        
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) { 
                return res.status(404).json({ error: 'User not found' });
            }
            const monthSummary = await prisma.monthlySummary.findFirst({
                where: {
                    userId: userId,
                    year: Number(year),
                    month: String(month)
                }
            });
            if (!monthSummary) {
                return res.json({ 
                    message: 'No transactions this month yet', 
                    summary: {
                        balance: Decimal(user.balance),
                        monthExpenses: Decimal(0),
                        monthIncomes: Decimal(0)
                    } 
                });
            }
            const summary = {
                balance: Decimal(user.balance),
                monthExpenses: Decimal(monthSummary.totalExpense),
                monthIncomes: Decimal(monthSummary.totalIncome)
            }; 
            return res.json({ message: 'Month summary retrieved successfully', summary });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error, while retrieving month summary' });
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
    },

    createTransaction: async (req: Request, res: Response) => {
        const userId = (req as any).user.userId;
        const { amount, type, description, category, date } = req.body;
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount value. Amount must be a positive number.' });
        }
        if (!Object.values(TransactionType).includes(type as TransactionType)) {
            return res.status(400).json({ error: 'Invalid transaction type. Type must be either INCOME or EXPENSE.' });
        }
        if (!Object.values(TransactionCategory).includes(category as TransactionCategory)) {
            return res.status(400).json({ error: 'Invalid transaction category. Category must be one of the predefined categories.' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId}
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        try {
            const transactionDate = date ? new Date(date) : new Date();
            const year = transactionDate.getFullYear();
            const month = String(transactionDate.getMonth() + 1);
            if (!year || !month) { 
                return res.status(400).json({ error: 'Invalid date value. Date must be a valid date string.' }); 
            }

            let yearlySummary = await prisma.yearlySummary.findFirst({
                where: {
                    userId: userId,
                    year: Number(year)
                }
            });

            if (!yearlySummary) {
                yearlySummary = await prisma.yearlySummary.create({
                    data: {
                        userId: userId,
                        year: Number(year),
                        totalIncome: Decimal(0),
                        totalExpense: Decimal(0)
                    }
                });
            }
            
            let monthlySummary = await prisma.monthlySummary.findFirst({
                where: {
                    userId: userId,
                    year: Number(year),
                    month: String(month)
                }
            });

            if (!monthlySummary) {
                monthlySummary = await prisma.monthlySummary.create({
                    data: {
                        userId: userId,
                        year: Number(year),
                        month: String(month),
                        totalIncome: Decimal(0),
                        totalExpense: Decimal(0),
                        salary: Decimal(user.monthSalary),
                        yearlySummaryId: yearlySummary.id
                    }
                });
            }

            const transaction = await prisma.transaction.create({
                data: {
                    userId: userId,
                    amount: Decimal(amount),
                    type: type,
                    description: description,
                    category: category,
                    date: transactionDate,
                    monthlySummaryId: monthlySummary.id
                }
            });

            if (type === TransactionType.INCOME) {
                await prisma.monthlySummary.update({
                    where: { id: monthlySummary.id },
                    data: { 
                        totalIncome: { increment: Decimal(amount) } 
                    }
                });
                await prisma.yearlySummary.update({
                    where: { id: yearlySummary.id },
                    data: { 
                        totalIncome: { increment: Decimal(amount) } 
                    }
                });
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        balance: { increment: Decimal(amount) }
                    }
                });
            }
            if (type === TransactionType.EXPENSE) {
                await prisma.monthlySummary.update({
                    where: { id: monthlySummary.id },
                    data: { 
                        totalExpense: { increment: Decimal(amount) } 
                    }
                });
                await prisma.yearlySummary.update({
                    where: { id: yearlySummary.id },
                    data: { 
                        totalExpense: { increment: Decimal(amount) } 
                    }
                });
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        balance: { decrement: Decimal(amount) }
                    }
                });
            }
             res.json({ message: 'Transaction created successfully', transaction });
        } catch (error) {
            console.error('Error creating transaction:', error);
            res.status(500).json({ error: 'Error creating transaction' });
        }
    },

    getTransactions: async (req: Request, res: Response) => {
        const userId = (req as any).user.userId;
        const dateQuery = req.query.date as string;
        const date = dateQuery ? new Date(dateQuery) : new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1);
        const page: number = parseInt(req.query.page as string) || 1;
        const pageSize: number = parseInt(req.query.pageSize as string) || 20;
        const skip = pageSize * (page - 1);

        try {
            const [transactions, totalCount] = await Promise.all([
                prisma.transaction.findMany({
                    where: { 
                        userId: userId,
                        monthlySummary: { 
                            year: Number(year), 
                            month: String(month) }
                    },
                    orderBy: { date: 'desc' },
                    take: pageSize,
                    skip: skip
                }),
                prisma.transaction.count({
                    where: { 
                        userId: userId,
                        monthlySummary: { 
                            year: Number(year), 
                            month: String(month) }
                    }
                })
            ]);

            const pagination = {
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
                totalCount: totalCount
            };

            return res.json({ 
                message: 'Transactions retrieved successfully', 
                transactions, 
                pagination 
            });
            
        } catch (error) {
            console.error('Error retrieving transactions:', error);
            res.status(500).json({ error: 'Error retrieving transactions' });
        }
    }

};