import express from "express";
const router = express.Router()
import { login, register, logout } from "../controllers/authController.js"


router.route('/login').post(login)
router.route('/register').post(register)
router.get('/logout', logout);

export default router