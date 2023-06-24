import express from 'express'
const router = express.Router()
import { adminDashboard, checkRequests, messages, billing, rentPayments, researchProperties } from '../controllers/adminControllers.js'

router.route('/').get(adminDashboard)
router.route('/requests').get(checkRequests)
router.route('/messages').get(messages)
router.route('/billing').get(billing)
router.route('/rent').get(rentPayments)
router.route('/research').get(researchProperties)

export default router