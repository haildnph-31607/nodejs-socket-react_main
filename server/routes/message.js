import { Router } from "express";
import { createMessage, getMessage } from "../controllers/message.js";
const messageRouter = Router()
messageRouter.post('/',createMessage)
messageRouter.get('/:chatId',getMessage)
export default messageRouter