import express from "express";
const router = express.Router()
import { createTenant, getAllTenants, getTenantDetails, updateTenant, deleteTenant } from "../controllers/tenantController.js";


router.route('/:id').get(getTenantDetails).patch(updateTenant).delete(deleteTenant)
router.route('/create').post(createTenant)
router.route('/').get(getAllTenants)

export default router