import express from "express";
const router = express.Router()
import { getAllUnits, getSingleUnit, createUnit } from "../controllers/unitController.js";

router.route('/create').post(createUnit)
router.route('/').get(getAllUnits)
router.route('/:id').get(getSingleUnit)

export default router