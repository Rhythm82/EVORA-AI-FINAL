import Judge from "../models/judge.model.js"
import bcrypt from "bcryptjs"

export const judgeLogin = async(judgeId,password)=>{

const judge = await Judge.findOne({judgeId})

if(!judge) return null

const valid = await bcrypt.compare(password,judge.password)

if(!valid) return null

return judge

}