import express from "express";
const router = express.Router()
import { createAppliance, updateAppliance, getAllAppliances, getApplianceDetails } from "../controllers/applianceController.js";

router.route('/').get(getAllAppliances)
router.route('/:id').get(getApplianceDetails).patch(updateAppliance)
router.route('/new').post(createAppliance)

export default router