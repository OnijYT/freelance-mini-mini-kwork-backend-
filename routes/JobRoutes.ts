import { Router }  from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createJob, getall, getmyjobs, getone } from "../controllers/jobController.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";


const router = Router()

router.get('/', getall)
router.get('/myjobs', authMiddleware, getmyjobs)
router.get('/:id', getone)

router.post('/create', authMiddleware, roleMiddleware('client'), createJob)

export default router