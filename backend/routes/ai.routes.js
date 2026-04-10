import express from "express"
import { generateMedia } from "../controllers/ai.controller.js"

const router = express.Router()

router.post("/generate", generateMedia)

export default router