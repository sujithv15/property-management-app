import Tenant from "../models/Tenant.js";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, NotFoundError } from "../errors/index.js";

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

	if (req.params.id !== req.user.tenantID) {
		throw new UnauthenticatedError('user not authenticated')
	}
	const tenantDetails = await Tenant.findById(req.params.id)
	res.status(StatusCodes.OK).json({ tenantDetails} )
}

const updateTenant = async (req, res) => {
	const { id } = req.params
	const tenant = await Tenant.findById(id)
	if (!tenant) {
		throw new NotFoundError(`No tenant with id :${id}`);
	}
	await Tenant.findByIdAndUpdate(id, req.body)
	res.status(StatusCodes.OK).json({tenant})
}

const deleteTenant = async (req, res) => {
	const { id } = req.params
	const tenant = await Tenant.findById(id)
	if (!tenant) {
		throw new NotFoundError(`No tenant with id :${id}`);
	}
	await Tenant.findByIdAndDelete(id)
	res.status(StatusCodes.OK).json({tenant})
}

export { createTenant, getAllTenants, getTenantDetails, updateTenant, deleteTenant }