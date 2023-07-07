import express from "express";
const router = express.Router()
import {
	getAllUsers,
	getUserInfo,
	updateUser,
	updateUserPassword,
	showCurrentUser
} from "../controllers/userController.js";
import {
	authenticateUser,
	authorizePermissions
} from "../middleware/authentication.js";


router.route('/').get(authenticateUser, authorizePermissions, getAllUsers)
router.route('/showUser').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
router.route('/:id').get(authenticateUser, authorizePermissions, getUserInfo);

export default router