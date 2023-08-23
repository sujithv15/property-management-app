import express from "express";
import { getUnitDetails } from "../controllers/userAccessibleController.js";
const router = express.Router()

router.route('/').get(getUnitDetails)

export default router;