import Payment from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

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
	const payments = await Payment.find()
	res.send(payments)
}

const getSinglePayment = async (req, res, next) => {
	const { id } = req.params
	const payment = await Payment.findOne({_id: id})
	if (!payment) {
		throw new NotFoundError(`No payment with id :${id}`);
	}
	res.send(payment)
}

export { createPayment, getAllPayments, getSinglePayment }