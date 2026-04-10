import mongoose from "mongoose"

const scoreSchema = new mongoose.Schema({

eventId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Event"
},

judgeId:String,

participantId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Participant"
},

criteriaId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Criteria"
},

score:{
type:Number,
default:0
}

},{timestamps:true})

export default mongoose.model("Score",scoreSchema)