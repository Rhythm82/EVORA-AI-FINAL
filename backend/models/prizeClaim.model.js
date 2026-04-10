import mongoose from "mongoose"

const prizeClaimSchema = new mongoose.Schema({

eventId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Event"
},

teamName:String,
leader:String,
rank:Number,
amount:Number,

email:String,
phone:String,

loginId:String,
password:String,

upi:String,
accountNumber:String,
ifsc:String,

status:{
type:String,
default:"pending"
}

},{timestamps:true})

export default mongoose.model("PrizeClaim",prizeClaimSchema)