import express from "express";
const router = express.Router()
import { createTenant, getAllTenants } from "../controllers/tenantController.js";

router.route('/').get(getAllTenants)
router.route('/new').post(createTenant)

export default router