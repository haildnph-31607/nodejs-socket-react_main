import { Router } from "express";
import { createChat, findChat, findUserChat } from "../controllers/chat.js";
const chatRouter = Router()
chatRouter.post('/',createChat)
chatRouter.get('/:id',findUserChat)
chatRouter.get('/find/:firstId/:seconId',findChat)
export default chatRouter