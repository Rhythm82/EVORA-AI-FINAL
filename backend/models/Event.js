import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  eventName:{
    type:String,
    required:true
  },

  eventType:{
    type:String,
    required:true
  },

  organisation:{
    type:String,
    required:true
  },

  hostName:{
    type:String,
    required:true
  },

  hostEmail:{
    type:String,
    required:true
  },

  hostPhone:{
    type:String,
    required:true
  },

  location:{
    type:String
  },

  description:{
    type:String
  },

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true})

export default mongoose.model("Event",eventSchema)