import express from "express";
const router = express.Router()
import { createExpense, getAllExpenses, getSingleExpense, updateExpense } from "../controllers/accountingController.js";

router.route('/create').post(createExpense)
router.route('/').get(getAllExpenses)
router.route('/:id').get(getSingleExpense).post(updateExpense)

export default router