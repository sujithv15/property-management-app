import express from "express";
const router = express.Router()
import { getAllUsers, getUserInfo, updateUser, updateUserPassword, showCurrentUser } from "../controllers/userController.js";

router.route('/').get(getAllUsers)
router.route('/showUser').get(showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)
router.route('/:id').get(getUserInfo);

export default router