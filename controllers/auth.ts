import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'


export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, fullname, role } = req.body

        if (!email || !password || !fullname || !role) {
            return res
            .status(400)
            .json({ message: 'все поля должны быть заполнены'})
        }

        const emailka = await User.findOne({ where: { email } })
        if (emailka) {
            return res
            .status(400)
            .json({ message: "Пользователь с таким Email уже существует" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            password: hashedpassword,
            fullname,
            role
        })

        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET || 'secret_key',
            {expiresIn: '24h'}
        )

        return res
        .status(201)
        .json({ 
            meassage: 'Регистрация прошла успешно', 
            token,
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
                role: user.role
            }
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password,} = req.body

        const emailka = await User.findOne({where: {email}})
        if(!emailka) {
            return res
                .status(404)
				.json({ message: "Пользователь с таким email не найден" });
        }

    } catch (err) {
        console.error(err)
        res
        .status(500)
        .json({message: 'Ошибка сервера'})
    }
}