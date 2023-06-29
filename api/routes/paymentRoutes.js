import express from "express";
const router = express.Router()
import { getAllPayments, getSinglePayment } from "../controllers/paymentController.js";


router.route('/').get(getAllPayments)
router.route('/:id').post(getSinglePayment)

export default router