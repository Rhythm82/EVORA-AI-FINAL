import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    teamName: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },





    

    phone: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Participant", participantSchema);
