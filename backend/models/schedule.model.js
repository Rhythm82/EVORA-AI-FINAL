import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({

  eventId: {
    type: String,
    required: true,
  },

  eventName: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  startDate: {
    type: String,
    required: true
  },

  endDate: {
    type: String,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  triggerTime: {
    type: Date
  },

  instruction: {
    type: String
  },

  status: {
    type: String,
    enum: ["scheduled","completed"],
    default: "scheduled"
  }

},{timestamps:true})

export default mongoose.model("Schedule",scheduleSchema)