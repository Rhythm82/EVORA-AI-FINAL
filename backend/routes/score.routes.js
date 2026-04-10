import express from "express"
import { submitScores } from "../controllers/score.controller.js"

const router = express.Router()

router.post("/submit",submitScores)

export default router