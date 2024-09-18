import { Router } from "express";
import authRouter from "./auth.js";
import chatRouter from "./chat.js";
import messageRouter from "./message.js";
const router = Router()

router.use('/platform',authRouter)
router.use('/chat',chatRouter)
router.use('/message',messageRouter)
export default router