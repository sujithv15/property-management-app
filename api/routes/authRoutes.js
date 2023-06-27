import express from "express";
const router = express.Router()
import login from "../controllers/authControllers.js"


router.route('.login').post(login)

export default router