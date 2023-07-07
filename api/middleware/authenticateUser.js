import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';
import Tenant from "../models/Tenant.js";


// all protected routes will be authorized
const authenticateUser = async (req, res, next) => {

	const token = req.cookies.token

	// if token not found, there is no user logged in
	if (!token) {
		throw new UnauthenticatedError('No token found');
	}
	// validated that the user exists, the login credentials are validated
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
	} catch (error) {
		throw new UnauthenticatedError('Authentication Invalid');
	}

	// if user !isAdmin, we find the tenant that corresponds with the userID, and add that value to the user object in req
	if (!req.user.isAdmin) {
		try {
			const tenant = await Tenant.findOne({ user: req.user.userID })
			req.user.tenantID = String(tenant._id)
		} catch (error) {
			throw new UnauthenticatedError(`No tenant with id :${req.user.userID}`);
		}
	}
	next()
};

// simple admin validation
const authenticateAdmin = (req, res, next) => {

	if (!req.user.isAdmin) {
		throw new UnauthenticatedError('Role not authenticated')
	}
	next()
}

export { authenticateUser, authenticateAdmin };
