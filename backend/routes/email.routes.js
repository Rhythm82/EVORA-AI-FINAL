import express from "express";
import { previewParticipantEmails, sendParticipantEmails } from "../controllers/email.controller.js";

const router = express.Router();
router.post("/preview/:eventId", previewParticipantEmails);
router.post("/send/:eventId", sendParticipantEmails);

export default router;