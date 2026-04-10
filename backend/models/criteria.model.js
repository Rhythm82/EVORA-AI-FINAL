import mongoose from "mongoose";

const criteriaSchema = new mongoose.Schema({

eventId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Event",
required:true
},

title:{
type:String,
required:true
},

weight:{
type:Number,
required:true
},

description:{
type:String
}

})

export default mongoose.model("Criteria",criteriaSchema)
