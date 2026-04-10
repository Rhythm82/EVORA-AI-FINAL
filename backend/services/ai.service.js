import axios from "axios";

export const generateAIContent = async (data) => {

  try {

    const response = await axios.post(
      process.env.AI_API_URL,
      {
        event_description: data.prompt
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.log("FULL AI ERROR:", error.response?.data);

    throw new Error("AI Service failed");

  }

};