import Unit from '../models/Unit.js'
import Tenant from "../models/Tenant.js";
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const adminDashboard = (req, res) => {
	res.send('Main Home Page')
}

const rentPayments = async (req, res) => {

	res.send('Rent Payments Home')
}

const researchProperties = (req, res) => {
	res.send('Research other properties, check FMR, and more')
}

const checkRequests = (req, res) => {
	res.send('Maintenance and Service Requests Home')
}

const billing = (req, res) => {
	res.send('We gotta pay the bills. This is the Payments Home')
}

const messages = (req, res) => {
	res.send('Check messages home')
}

export { adminDashboard, rentPayments, researchProperties, checkRequests, billing, messages }