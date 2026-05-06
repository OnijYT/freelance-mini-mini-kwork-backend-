import { Router } from "express";
import checkAuth, { getMe } from "../middleware/checkAuth.js";

const router = Router()


router.get('/auth', checkAuth, getMe)

export default router