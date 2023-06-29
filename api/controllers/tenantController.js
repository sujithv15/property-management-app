import Tenant from "../models/Tenant.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const createTenant = async (req, res, next) => {
	// destructure tenant obj sent from front end
	const { unit, lastName, firstName, address, email, phone, rent, rentAssisted, housingAgency } = req.body

	if (!unit || !lastName || !firstName || !phone || !rent) {
		throw new BadRequestError('please provide completed tenant information')
	}

	// create new tenant using Tenant model method
	const newTenant = await Tenant.create({ unit, lastName, firstName, address, email, phone, rent, rentAssisted, housingAgency })

	// send response JSON to include new tenant
	res.status(StatusCodes.CREATED)
	   .json({newTenant})
}