import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
    user?: {
        id: number
        role: string
    }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

}