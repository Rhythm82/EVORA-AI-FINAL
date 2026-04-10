import express from "express"
import { createJudge, judgeLogin } from "../controllers/judge.controller.js"

const router = express.Router()

router.post("/create",createJudge)

router.post("/login",judgeLogin)

export default router