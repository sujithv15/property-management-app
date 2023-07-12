import express from "express";
const router = express.Router()
import { getAllUnits, getSingleUnit, createUnit, updateUnit, deleteUnit } from "../controllers/unitController.js";
import {
	authenticateUser,
	authorizePermissions
} from "../middleware/authentication.js";

router.route('/create').post(createUnit)
router.route('/').get(getAllUnits)
router.route('/:id').get(getSingleUnit).patch(updateUnit).delete(deleteUnit)

export default router