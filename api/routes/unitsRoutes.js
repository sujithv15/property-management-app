import express from "express";
const router = express.Router()
import { getUserInfo, sendRequest } from "../controllers/userController.js";

router.route('/:id').get(getUserInfo)
router.route('/request/:id').post(sendRequest)

export default router