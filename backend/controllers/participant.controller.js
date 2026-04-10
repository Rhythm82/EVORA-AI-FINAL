import Participant from "../models/participant.model.js";
import { parseParticipantFile } from "../services/participant.service.js";

export const uploadParticipants = async (req, res) => {
  try {
    console.log("Upload route hit");

    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Upload route hit");
    console.log(req.file);
    console.log(req.params.id);
    const parsedData = await parseParticipantFile(req.file);

    if (!parsedData || parsedData.length === 0) {
      return res.status(400).json({ message: "No participants found in file" });
    }

    const participants = parsedData.map((p) => ({
      eventId: id,
      teamName: p["Team Name"] || p.teamName || "",
      name: p["Leader Name"] || p.name || "",
      email: p["Leader Email"] || p.email || "",
      phone: p["Phone"] || p.phone || "",
    }));

    await Participant.insertMany(participants);

    res.json({
      message: "Participants uploaded successfully",
      count: participants.length,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getParticipantsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const participants = await Participant.find({ eventId });

    res.json(participants);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch participants"
    });

  }
};