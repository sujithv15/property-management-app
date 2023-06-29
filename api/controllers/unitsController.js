import Unit from "../models/Unit.js";
import {StatusCodes} from "http-status-codes";

const getAllUnits = async (req, res, next) => {
	res.send('getAllUnits')
}

const getSingleUnit = async (req, res, next) => {
	res.send('getSingleUnit')
}

export { getAllUnits, getSingleUnit }