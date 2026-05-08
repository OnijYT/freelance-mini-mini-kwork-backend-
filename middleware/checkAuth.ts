import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, Useratributs } from '../models/User.js'
import { AuthRequest } from './authMiddleware.js'


export const getMe = async (req: AuthRequest, res: Response ) => {
    try {
        const user = await User.findByPk(req.user?.id)
        if(!user) {
            res
            .status(404)
            .json({message: 'Пользователь не найден'})
        }
        const {password, ...userData} = user?.get({ plain: true}) as Useratributs

        res.json(userData)
    } catch(e) {
        console.error(e);
        res
        .status(500)
        .json({message: 'Ошибка сервера'})
    }

    
}