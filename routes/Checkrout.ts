import { Router } from "express";
import { getMe } from "../middleware/checkAuth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()


router.get('/me', authMiddleware, getMe)

export default router