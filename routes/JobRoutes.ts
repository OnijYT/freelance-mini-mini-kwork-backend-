import { Router }  from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createJob, deletemyjob, getall, getmyjobs, getone, updatemyjob } from "../controllers/jobController.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";


const router = Router()

router.get('/', getall)
router.get('/myjobs', authMiddleware, getmyjobs)
router.post('/create', authMiddleware, roleMiddleware('client'), createJob)

router.patch('/:id', authMiddleware, roleMiddleware('client'), updatemyjob)
router.delete('/:id', authMiddleware, roleMiddleware('client'), deletemyjob)
router.get('/:id', getone)

export default router