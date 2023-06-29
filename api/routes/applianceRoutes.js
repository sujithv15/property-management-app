import express from "express";
const router = express.Router()
import { createAppliance, updateAppliance, getAllAppliances, getSingleAppliance } from "../controllers/applianceController.js";

router.route('/').get(getAllAppliances)
router.route('/:id').get(getSingleAppliance)
router.route('/new').post(createAppliance)
router.route('/:id').put(updateAppliance)


export default router