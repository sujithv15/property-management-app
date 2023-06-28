import express from "express";
const router = express.Router()
import { login, register, _login } from "../controllers/authControllers.js"

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/login_admin').post(_login)

export default router