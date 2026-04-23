import { Router }  from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createJob, getall, getone } from "../controllers/jobController.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";


const router = Router()

router.get('/', getall)
router.get('/:id', getone)

router.post('/create', authMiddleware, roleMiddleware('client'), createJob)

export default router