import User from "../models/Unit.js";
import {StatusCodes} from "http-status-codes";

const getUserInfo = async (req, res, next) => {
	res.send('getUserInfo')
}

const sendRequest = async (req, res, next) => {
	res.send('sendRequest')
}

export { getUserInfo, sendRequest }