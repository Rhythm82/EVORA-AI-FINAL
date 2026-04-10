import Score from "../models/score.model.js"

export const submitScores = async (req,res)=>{

try{

const {judgeId,participantId,eventId,scores} = req.body

if(!judgeId || !participantId || !eventId){
return res.status(400).json({
message:"Missing required fields"
})
}

for(const item of scores){

await Score.findOneAndUpdate(

{
judgeId,
participantId,
criteriaId:item.criteriaId,
eventId
},

{
score:item.score
},

{
upsert:true,
returnDocument:"after"
}

)

}

res.json({
message:"Scores submitted successfully"
})

}catch(err){

console.error("Score Submit Error:",err)

res.status(500).json({
message:"Score submission failed"
})

}

}