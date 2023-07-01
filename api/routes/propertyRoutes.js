import express from "express";
const router = express.Router()
import { createProperty, getAllProperties, getPropertyDetails } from "../controllers/propertyController.js";

router.route('/').get(getAllProperties)
router.route('/:id').get(getPropertyDetails)
router.route('/create').post(createProperty)
router.route('/:id').patch(getPropertyDetails)

export default router