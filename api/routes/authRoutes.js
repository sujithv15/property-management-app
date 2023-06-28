import express from "express";
const router = express.Router()
import { login, register } from "../controllers/authControllers.js"

router.route('/login').post(login)
router.route('/register').post(register)

export default router