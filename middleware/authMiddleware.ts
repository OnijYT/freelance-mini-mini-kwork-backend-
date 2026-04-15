import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        id: number
        role: string
    }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authchek = req.headers.authorization

    if(!authchek || !authchek.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({message: 'Пользователь не авторизован'})
    }

    const token = authchek.split(' ')[1]

    try {
        const decoded = jwt.verify(token, 'superpuper123') as {id: number, role: string}
        req.user = decoded

        next()
    } catch(err){
        console.error(err)
        res
        .status(401)
        .json({message: 'Не правльный токен или прострочена'})
    }
}