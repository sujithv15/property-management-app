import express from "express";
const router = express.Router()
import { getAllUnits, getSingleUnit } from "../controllers/unitsController.js";

router.route('/').get(getAllUnits)
router.route('/:id').get(getSingleUnit)

export default router