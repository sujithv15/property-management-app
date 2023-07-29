import Expense from "../models/Expense.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createExpense = async (req, res) => {

	// create new expense using Expense model method
	const newExpense = await Expense.create(req.body)

	// send response JSON to include expense
	res.status(StatusCodes.CREATED).json({newExpense})
}

const getAllExpenses = async (req, res) => {
	const expenses = await Expense.find()
	res.status(StatusCodes.OK).json({ expenses })
}

const getSingleExpense = async (req, res) => {
	const { id } = req.params
	const expense = await Expense.findOne({_id: id})
	if (!expense) {
		throw new NotFoundError(`No payment with id :${id}`);
	}
	res.status(StatusCodes.OK).json({expense})
}

const updateExpense = async (req, res) => {
	await Expense.findByIdAndUpdate(req.params.id, req.body)
	res.status(StatusCodes.OK).json({msg: `${req.body.type} updated`})
}

export { createExpense, getAllExpenses, getSingleExpense, updateExpense }