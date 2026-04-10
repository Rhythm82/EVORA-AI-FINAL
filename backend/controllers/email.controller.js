import mongoose from "mongoose";
import Participant from "../models/participant.model.js";
import { generateEmailsFromAI } from "../services/aiEmail.service.js";
import { sendBulkEmails } from "../services/email.service.js";

export const sendParticipantEmails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { instruction, override } = req.body;

    const participants = await Participant.find({ eventId });

    if (!participants.length) {
      return res.status(400).json({
        message: "No participants found",
      });
    }

    const dataForAI = participants.map((p) => ({
      name: p.name,
      email: p.email,
    }));

    const aiResponse = await generateEmailsFromAI(instruction, dataForAI);

    console.log("AI RESPONSE:", aiResponse);

    console.log("AI RESPONSE:", aiResponse);

    // 🔥 ADD THIS BLOCK
    if (!aiResponse || aiResponse.status === "error" || !aiResponse.emails) {
      return res.status(500).json({
        message: "AI failed to generate emails",
        error: aiResponse?.message || "Invalid AI response",
      });
    }

    /* Apply manual edits if provided */
    if (override) {
      aiResponse.emails = (aiResponse.emails || []).map((mail) => ({
        ...mail,
        subject: override?.subject || mail.subject,
        body: override?.body || mail.body,
      }));
    }

    const formattedEmails = (aiResponse.emails || []).map((e) => ({
      to: e.to || e.email,
      subject: e.subject,
      body: e.body || e.message,
    }));

    console.log("FORMATTED EMAILS:", formattedEmails);

    await sendBulkEmails(formattedEmails);

    res.json({
      message: "Emails sent successfully",
      count: formattedEmails.length,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Email sending failed",
    });
  }
};

export const previewParticipantEmails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { instruction } = req.body;

    const participants = await Participant.find({ eventId });

    if (!participants.length) {
      return res.status(400).json({
        message: "No participants found",
      });
    }

    const dataForAI = participants.map((p) => ({
      name: p.name,
      email: p.email,
    }));

    const aiResponse = await generateEmailsFromAI(instruction, dataForAI);

    res.json(aiResponse);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Preview generation failed",
    });
  }
};
