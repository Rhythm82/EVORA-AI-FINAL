import Judge from "../models/judge.model.js"
import bcrypt from "bcryptjs"
import { sendJudgeEmail } from "../services/judgeEmail.service.js"


/* CREATE JUDGE */

export const createJudge = async(req,res)=>{

try{

const {name,email,phone,role,eventId} = req.body

if(!name || !email || !eventId){

return res.status(400).json({
message:"Missing required fields"
})

}

/* generate judge id */

const judgeId = "JDG-" + Math.floor(100000 + Math.random()*900000)

/* generate password */

const plainPassword = Math.random().toString(36).slice(-8)

/* hash password */

const hashed = await bcrypt.hash(plainPassword,10)

const judge = await Judge.create({

name,
email,
phone,
role,
eventId,
judgeId,
password:hashed

})

/* send email */

await sendJudgeEmail(email,judgeId,plainPassword)

res.json({

message:"Judge created and email sent",
judge

})

}catch(err){

console.error(err)

res.status(500).json({
message:"Judge creation failed"
})

}

}



/* JUDGE LOGIN */

export const judgeLogin = async(req,res)=>{

try{

const {judgeId,password} = req.body

const judge = await Judge.findOne({judgeId})

if(!judge){

return res.status(404).json({
message:"Judge not found"
})

}

const match = await bcrypt.compare(password,judge.password)

if(!match){

return res.status(401).json({
message:"Invalid password"
})

}

res.json({

message:"Login success",

judge:{
_id:judge._id,
name:judge.name,
email:judge.email,
eventId:judge.eventId,
judgeId:judge.judgeId
}

})

}catch(err){

console.error(err)

res.status(500).json({
message:"Login failed"
})

}

}