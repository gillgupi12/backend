import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Secret not found!');
        }

        const decoded = verify(token, secret) as { id: string };
        req.body.user = decoded; 
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid token!' });
    }
};

export default authMiddleware;