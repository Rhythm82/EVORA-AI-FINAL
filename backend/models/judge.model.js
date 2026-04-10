import mongoose from "mongoose"

const judgeSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

phone:{
type:String
},

role:{
type:String,
default:"Judge"
},

judgeId:{
type:String,
unique:true
},

password:{
type:String,
required:true
},

eventId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Event",
required:true
}

},{timestamps:true})

export default mongoose.model("Judge",judgeSchema)