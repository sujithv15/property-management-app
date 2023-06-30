import express from "express";
const router = express.Router()
import { login, register, update, logout } from "../controllers/authControllers.js"

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/update').put(update)
router.get('/logout', logout);


export default router