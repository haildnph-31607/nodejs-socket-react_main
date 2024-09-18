import { Router } from "express";
import { findUser, getAll, login, register } from "../controllers/Auth.js";
const authRouter = Router()
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.get('/find/:id',findUser);
authRouter.get('/',getAll);
export default authRouter