import express, { Request, Response, NextFunction } from 'express';
    import jwt from 'jsonwebtoken';

    const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send('Access denied. No token provided.');

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
      } catch (error) {
        res.status(400).send('Invalid token');
      }
    };

    export default authMiddleware;
