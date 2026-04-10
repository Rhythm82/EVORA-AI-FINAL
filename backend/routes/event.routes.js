import express from "express";
import {
  create,
  list,
  remove,
  update,
  getEventById
} from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", protect, create);

router.get("/my", protect, list);

router.delete("/:id", protect, remove);

router.put("/:id", protect, update);
router.get("/:eventId", getEventById);

export default router;
