import express from "express";
const router = express.Router()
import { createProperty, getAllProperties, getPropertyDetails, updateProperty, deleteProperty } from "../controllers/propertyController.js";

router.route('/').get(getAllProperties)
router.route('/:id').get(getPropertyDetails).patch(updateProperty).delete(deleteProperty)
router.route('/create').post(createProperty)


export default router