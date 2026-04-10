import express from "express"
import { createCriteria, getCriteriaByEvent } from "../controllers/criteria.controller.js"

const router = express.Router()

router.post("/create", createCriteria)
router.get("/:eventId", getCriteriaByEvent);

export default router