import express from "express";
const router = express.Router()
import { createMessage, getAllMessages } from "../controllers/messagesController.js";

router.route('/create').post(createMessage)
router.route('/').get(getAllMessages)

export default router