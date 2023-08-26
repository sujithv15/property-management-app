import express from "express";
const router = express.Router()
import { createMessage, getAllMessages, getSentMessages, toggleMessageRead, toggleMessageUnread, toggleMessageFlag } from "../controllers/messagesController.js";

router.route('/create').post(createMessage)
router.route('/').get(getAllMessages)
router.route('/sent').get(getSentMessages)
router.route('/read').patch(toggleMessageRead)
router.route('/unread').patch(toggleMessageUnread)
router.route('/flag').patch(toggleMessageFlag)

export default router