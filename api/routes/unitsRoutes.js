import express from "express";
const router = express.Router()
import { getAllUnits, getSingleUnit, createUnit } from "../controllers/unitsController.js";

router.route('/new').post(createUnit)
router.route('/').get(getAllUnits)
router.route('/:id').get(getSingleUnit)

export default router