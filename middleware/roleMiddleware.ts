import { AuthRequest } from "./authMiddleware";
import { Response, NextFunction } from "express";

export const roleMiddleware = (CheckRole: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if(!req.user || req.user.role !== CheckRole) {
            return res
                .status(403)
                .json({ message: 'Доступ запрещен: недостаточно прав' })
        }
        next()
    }
}

