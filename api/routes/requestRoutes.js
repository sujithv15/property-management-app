import express from "express";
const router = express.Router()
import { createRequest, getAllRequests, getRequestDetails } from "../controllers/requestController.js";

router.route('/new').post(createRequest)
router.route('/:id').get(getRequestDetails)
router.route('/').get(getAllRequests)

export default router