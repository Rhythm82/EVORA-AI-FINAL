import express from "express";
import multer from "multer";
import {
  uploadParticipants,
  getParticipantsByEvent,
} from "../controllers/participant.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* upload participants */

router.post(
  "/:id/participants-upload",
  upload.single("file"),
  uploadParticipants,
);

/* get participants by event */

router.get("/event/:eventId", getParticipantsByEvent);

export default router;
