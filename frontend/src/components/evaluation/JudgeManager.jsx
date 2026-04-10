import { useState } from "react"
import api from "../../lib/api"
import toast from "react-hot-toast"

export default function JudgeManager({eventId}){

const [judge,setJudge] = useState({
name:"",
email:"",
phone:"",
role:"Judge"
})

const addJudge = async()=>{

if(!eventId){
toast.error("Event ID missing")
return
}

if(!judge.name || !judge.email){
toast.error("Name and Email required")
return
}

try{

await api.post("/judge/create",{
...judge,
eventId
})

toast.success("Judge invited successfully")

setJudge({
name:"",
email:"",
phone:"",
role:"Judge"
})

}catch(err){

console.error(err)
toast.error("Failed to create judge")

}

}

return(

<div className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-xl">

<h2 className="text-2xl font-bold mb-6 text-purple-700">
Add Judge
</h2>

<div className="grid grid-cols-2 gap-4">

<input
className="border p-3 rounded-lg"
placeholder="Judge Name"
value={judge.name}
onChange={e=>setJudge({...judge,name:e.target.value})}
/>

<input
className="border p-3 rounded-lg"
placeholder="Email"
value={judge.email}
onChange={e=>setJudge({...judge,email:e.target.value})}
/>

<input
className="border p-3 rounded-lg"
placeholder="Phone"
value={judge.phone}
onChange={e=>setJudge({...judge,phone:e.target.value})}
/>

<input
className="border p-3 rounded-lg"
placeholder="Role"
value={judge.role}
onChange={e=>setJudge({...judge,role:e.target.value})}
/>

</div>

<button
onClick={addJudge}
className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg"
>
Invite Judge
</button>

</div>

)

}