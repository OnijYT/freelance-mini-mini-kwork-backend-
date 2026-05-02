import { Response, Request, NextFunction } from 'express'


export default (req: Request, res: Response, next: NextFunction) => {
    const auth = (req.headers.authorization || '').replace('/Bearer\s?/', '')

    if (!auth) {
        res
        .status(403)
        .json({message: 'Не авторизован'})
    }



    
}