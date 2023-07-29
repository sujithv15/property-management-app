import express from "express";
const router = express.Router()
import { createExpense, getAllExpenses, getSingleExpense } from "../controllers/accountingController.js";

router.route('/create').post(createExpense)
router.route('/').get(getAllExpenses)
router.route('/:id').post(getSingleExpense)

export default router