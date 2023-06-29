import express from "express";
const router = express.Router()
import { createPayment, getAllPayments, getSinglePayment } from "../controllers/paymentController.js";

router.route('/new').post(createPayment)
router.route('/').get(getAllPayments)
router.route('/:id').post(getSinglePayment)

export default router