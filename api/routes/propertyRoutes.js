import express from "express";
const router = express.Router()
import { createProperty, getAllProperties, getPropertyDetails } from "../controllers/propertyController.js";

router.route('/').get(getAllProperties)
router.route('/:id').get(getPropertyDetails)
router.route('/new').post(createProperty)
router.route('/:id').put(getPropertyDetails)

export default router