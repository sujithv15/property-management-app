import Tenant from "../models/Tenant.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

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

const getAllTenants = async (req, res, next) => {
	const tenants = await Tenant.find()
	res.send(tenants)
}

const getTenantDetails = async (req, res, next) => {
	const {id} = req.params
	const tenant = await Tenant.find({_id: id})
	if (!tenant) {
		throw new NotFoundError(`No tenant with id :${id}`);
	}
	res.send(tenant)
}
export { createTenant, getAllTenants, getTenantDetails }