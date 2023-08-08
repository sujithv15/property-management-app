import express from "express";
const router = express.Router()
import { getAllUnits, getUnitDetails, createUnit, updateUnit, deleteUnit, updateImage } from "../controllers/unitController.js";


router.route('/create').post(createUnit)
router.route('/').get(getAllUnits)
router.route('/:id').get(getUnitDetails).patch(updateUnit).delete(deleteUnit).post(updateImage)

export default router