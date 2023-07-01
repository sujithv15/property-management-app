import Tenant from "../models/Tenant.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createTenant = async (req, res, next) => {

	// create new tenant using Tenant model method
	const newTenant = await Tenant.create(req.body)
	// send response JSON to include new tenant
	res.status(StatusCodes.CREATED).json({newTenant})
}

const getAllTenants = async (req, res, next) => {
	const tenants = await Tenant.find()
	res.status(StatusCodes.OK).json({tenants})
}

const getTenantDetails = async (req, res, next) => {
	const {id} = req.params
	const tenant = await Tenant.find({_id: id})
	if (!tenant) {
		throw new NotFoundError(`No tenant with id :${id}`);
	}
	res.status(StatusCodes.OK).json({tenant})
}
export { createTenant, getAllTenants, getTenantDetails }