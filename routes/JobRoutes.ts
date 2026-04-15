import { Router }  from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createJob } from "../controllers/jobController";
import { roleMiddleware } from "../middleware/roleMiddleware";


const router = Router()

router.post('/create', authMiddleware, roleMiddleware('client'), createJob)