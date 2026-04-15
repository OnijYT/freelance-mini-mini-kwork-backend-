import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { Job } from '../models/Jobs'

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

        res
        .status(201)
        .json({
            message: 'Заказ успешно создан',
            zakaz
        })

    } catch(err) {
        console.error(err)
        res
        .status(500)
        .json({ message: 'Ошибка при создании заказа' })
    }
}
