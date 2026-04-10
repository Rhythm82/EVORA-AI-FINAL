import express from "express"
import { createPaymentLink } from "../controllers/payment.controller.js"

const router = express.Router()

router.post("/create",createPaymentLink)

export default router