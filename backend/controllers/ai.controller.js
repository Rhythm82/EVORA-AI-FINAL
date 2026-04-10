import Event from "../models/Event.js";
import { generateAIContent } from "../services/ai.service.js";

export const generateMedia = async (req, res) => {

  try {

    const { prompt } = req.body;

    console.log("Prompt received:", prompt);

    const aiResponse = await generateAIContent({ prompt });

    console.log("AI Response:", aiResponse);

    res.json(aiResponse);

  } catch (err) {

    console.error("MEDIA AGENT ERROR:", err);

    res.status(500).json({
      message: "AI generation failed"
    });

  }

};
