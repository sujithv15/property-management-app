import Payment from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const createPayment = async (req, res, next) => {

	// destructure payment obj sent from front end
	const { payTo, amount, dateDue, datePaid, balance, status, comments } = req.body

	if (!payTo || !amount) {
		throw new BadRequestError('please provide entity to pay to and amount of payment')
	}

	// create new payment using Payment model method
	const newPayment = await Payment.create({ payTo, amount, dateDue, datePaid, balance, status, comments })

	// send response JSON to include payment
	res.status(StatusCodes.CREATED)
	   .json({newPayment})
}

const getAllPayments = async (req, res, next) => {
	res.send('getAllPayments')
}

const getSinglePayment = async (req, res, next) => {
	res.send('getSinglePayment')
}

export { createPayment, getAllPayments, getSinglePayment }