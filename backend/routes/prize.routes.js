import express from "express"
import {
 sendPrizeEmail,
 prizeLogin,
 submitPaymentDetails,
 getPrizeClaimsByEvent
} from "../controllers/prize.controller.js"

const router = express.Router()

router.post("/send", sendPrizeEmail)

router.post("/login", prizeLogin)

router.post("/submit", submitPaymentDetails)

router.get("/event/:eventId", getPrizeClaimsByEvent)

export default router