import express from "express"

import {
createSchedules,
getAllSchedules,
updateSchedule,
deleteSchedule
} from "../controllers/scheduler.controller.js"

const router = express.Router()

router.post("/create",createSchedules)

router.get("/",getAllSchedules)

router.put("/:id",updateSchedule)

router.delete("/:id",deleteSchedule)

export default router