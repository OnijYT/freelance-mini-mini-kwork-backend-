import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, Useratributs } from '../models/User.js'

export interface Costumeid extends Request {
    userId?: number
} 


export default (req: Costumeid, res: Response, next: NextFunction) => {
    try {
        const auth = (req.headers.authorization || '').replace(/Bearer\s?/, '')

        if (!auth) {
        return res
        .status(403)
        .json({message: 'Не авторизован'})
        }
        const decoded = jwt.verify(auth, 'secret_key') as {id: number}
        req.userId = decoded.id
        next()

    } catch (err){
        console.error(err);
        res
        .status(403)
        .json({message: 'Ошибка что то не так'})
    }
        
}

export const getMe = async (req: Costumeid, res: Response ) => {
    try {
        const user = await User.findByPk(req.userId)
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