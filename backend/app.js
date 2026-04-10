import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import participantRoutes from "./routes/participant.routes.js";
import emailRoutes from "./routes/email.routes.js";
import schedulerRoutes from "./routes/scheduler.routes.js";
import criteriaRoutes from "./routes/criteria.routes.js"
import scoreRoutes from "./routes/score.routes.js"
import leaderboardRoutes from "./routes/leaderboard.routes.js"
import judgeRoutes from "./routes/judge.routes.js"
import prizeRoutes from "./routes/prize.routes.js";
import paymentRoutes from "./routes/payment.routes.js"


import { startTriggerEngine } from "./services/trigger.service.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* FIXED ROUTE */
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/criteria", criteriaRoutes)
app.use("/api/judge",judgeRoutes);
app.use("/api/scores",scoreRoutes)
app.use("/api/leaderboard",leaderboardRoutes)
app.use("/api/events",eventRoutes);
app.use("/api/prize",prizeRoutes);
app.use("/api/payment",paymentRoutes)
app.get("/", (req, res) => {
  res.send("EVORA Backend API");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    startTriggerEngine();
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
