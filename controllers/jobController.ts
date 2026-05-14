import { AuthRequest } from "../middleware/authMiddleware.js";
import { Response, Request } from "express";
import { Job } from '../models/Jobs.js'
import { User } from '../models/User.js'
import { stat } from "node:fs";

export const createJob = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, price } = req.body
        const clientId = req.user?.id

        if (!clientId) {
            return res
                .status(401)
                .json({message: 'Не авторизован'})
        }

        const zakaz = await Job.create({ 
            title,
            description,
            price,
            clientId,
            status: 'open'
         })

        return res
        .status(201)
        .json({
            message: 'Заказ успешно создан',
            zakaz
        })

    } catch(err) {
        console.error(err)
        return res
        .status(500)
        .json({ message: 'Ошибка при создании заказа' })
    }
}

export const getall = async (_req: Request, res: Response) => {
    try {
        const daniye = await Job.findAll({
            include: [{
                model: User, 
                attributes: ['fullname', 'email'] 
            }],
            order: [['createdAt', 'DESC']]
        })
        
        return res.json(daniye)
    } catch (err) {
        console.error(err)
        return res
        .status(500)
        .json({ message: 'ошибка при получение данных' })
    }
}

export const getone = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const daniye = await Job.findByPk(id, {
            include: [{
                model: User,
                attributes: ['fullname', 'email']
            }],
        })

        if(!daniye) {
            return res
            .status(404)
            .json({ message: 'Заказ не найден' })
        }

        return res.json(daniye)
    } catch (err) {
        console.error(err)
        return res
        .status(500)
        .json({message: 'Ошибка при получении заказа'})
    }
}

export const getmyjobs = async (req: AuthRequest, res: Response) => {
    try {
        const clientId = req.user?.id
        const job = await Job.findAll({where: { clientId }})

        return res.json(job)
    } catch (err) {
        console.error(err);
        return res
        .status(500)
        .json({message: 'Ошибка при получении'})
    }
}