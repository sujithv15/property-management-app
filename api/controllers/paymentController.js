import Payment from "../models/Unit.js";
import {StatusCodes} from "http-status-codes";

const getAllPayments = async (req, res, next) => {
	res.send('getAllPayments')
}

const getSinglePayment = async (req, res, next) => {
	res.send('getSinglePayment')
}

export { getAllPayments, getSinglePayment }