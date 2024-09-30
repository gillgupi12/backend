import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No Token provided' })
    }
    try {
        // const decoded = verify(token, process.env.JWT_SECRET);
        // req.user = decoded;
        // next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token!' })
    }
}

export default authMiddleware;