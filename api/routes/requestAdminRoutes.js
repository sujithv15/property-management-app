import express from "express";
const router = express.Router()
import { editRequest, getAllRequests, getRequestDetails } from "../controllers/requestAdminController.js";

router.route('/edit').patch(editRequest)
router.route('/:id').get(getRequestDetails)
router.route('/').get(getAllRequests)

export default router