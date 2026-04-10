import axios from "axios";

export const generateScheduleFromAI = async(events)=>{

try{

const response = await axios.post(
process.env.AI_SCHEDULER_API,
{events},
{
headers:{
"Content-Type":"application/json"
}
}
)

return response.data

}catch(error){

console.error("AI Scheduler Error:",error.response?.data || error.message)

throw new Error("Scheduler AI failed")

}

}