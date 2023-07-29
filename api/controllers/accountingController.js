import Expense from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createExpense = async (req, res, next) => {

	// destructure expense obj sent from front end
	const { type, unit, description, payTo, amount, recurring, dateDue, datePaid, balance, status, comments } = req.body

	if (!type) {
		throw new BadRequestError('please provide type of expense')
	}

	// create new expense using Expense model method
	const newExpense = await Expense.create({ type, unit, description, payTo, amount, recurring, dateDue, datePaid, balance, status, comments })

	// send response JSON to include expense
	res.status(StatusCodes.CREATED).json({newExpense})
}

const getAllExpenses = async (req, res, next) => {
	const expenses = await Expense.find()
	res.status(StatusCodes.OK).json({ expenses })
}

const getSingleExpense = async (req, res, next) => {
	const { id } = req.params
	const expense = await Expense.findOne({_id: id})
	if (!expense) {
		throw new NotFoundError(`No payment with id :${id}`);
	}
	res.status(StatusCodes.OK).json({expense})
}

export { createExpense, getAllExpenses, getSingleExpense }