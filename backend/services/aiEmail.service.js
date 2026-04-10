import axios from "axios";

export const generateEmailsFromAI = async (instruction, participants) => {

  try {

    const response = await axios.post(
      process.env.AI_EMAIL_API,
      {
        instruction,
        participants
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error("AI EMAIL ERROR:", error.response?.data || error.message);

    throw new Error("AI Email generation failed");

  }

};