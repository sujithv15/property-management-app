import Tenant from "../models/Tenant.js";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, NotFoundError } from "../errors/index.js";

const createTenant = async (req, res) => {
	console.log(req.body);
	// create new tenant using TenantUnit model method
	const newTenant = await Tenant.create(req.body)
	// send response JSON to include new tenant
	res.status(StatusCodes.CREATED).json({newTenant})
}

const getAllTenants = async (req, res) => {
	const tenants = await Tenant.find().sort({ lastName: 1 })
	res.status(StatusCodes.OK).json({tenants})
}

const getTenantDetails = async (req, res) => {

	const tenantDetails = await Tenant.findById(req.params.id)
	res.status(StatusCodes.OK).json({ tenantDetails } )
}

const updateTenant = async (req, res) => {
	const tenant = await Tenant.findById(req.params.id)
	if (!tenant) {
		throw new NotFoundError(`No tenant with id :${req.params.id}`);
	}
	console.log(req.params.id);
	console.log(req.body);
	const newTenant = await Tenant.findByIdAndUpdate(req.params.id, req.body)
	res.status(StatusCodes.OK).json({newTenant})
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