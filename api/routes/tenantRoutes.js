import express from "express";
const router = express.Router()
import { createTenant, getAllTenants, getTenantDetails } from "../controllers/tenantController.js";

router.route('/').get(getAllTenants)
router.route('/:id').get(getTenantDetails)
router.route('/create').post(createTenant)

export default router