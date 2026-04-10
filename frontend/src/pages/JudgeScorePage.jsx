import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../lib/api"
import toast from "react-hot-toast"

export default function JudgeScorePage(){

const judge = JSON.parse(localStorage.getItem("judge"))
const { eventId } = useParams()
const navigate = useNavigate()

const [event,setEvent] = useState(null)
const [participants,setParticipants] = useState([])
const [criteria,setCriteria] = useState([])
const [scores,setScores] = useState({})
const [search,setSearch] = useState("")

useEffect(()=>{
load()
},[])

const load = async()=>{

try{

const e = await api.get(`/events/${eventId}`)
setEvent(e.data)

const p = await api.get(`/participants/event/${eventId}`)
setParticipants(p.data)

const c = await api.get(`/criteria/${eventId}`)
setCriteria(c.data)

}catch(err){

toast.error("Failed to load evaluation data")

}

}

/* group teams */

const grouped = {}

participants.forEach(p=>{

const key = p.teamName || p.name

if(!grouped[key]) grouped[key]=[]

grouped[key].push(p)

})

/* search filter */

const teams = Object.keys(grouped).filter(t=>
t.toLowerCase().includes(search.toLowerCase())
)

/* handle score */

const handleScore = (team,cid,value,max)=>{

if(value>max) value=max
if(value<0) value=0

setScores(prev=>({
...prev,
[team]:{
...prev[team],
[cid]:value
}
}))

}

/* submit all scores */

const submitAll = async()=>{

try{

for(const team of Object.keys(scores)){

const member = grouped[team][0]

const payload = criteria.map(c=>({
criteriaId:c._id,
score:Number(scores[team]?.[c._id] || 0)
}))

await api.post("/scores/submit",{
judgeId:judge._id,
participantId:member._id,
eventId,
scores:payload
})

}

toast.success("Scores submitted")

navigate(`/leaderboard/${eventId}`)

}catch(err){

toast.error("Score submission failed")

}

}

return(

<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white p-10">

{/* HEADER */}

<div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 mb-10">

<h1 className="text-4xl font-bold text-purple-700">
Welcome Judge {judge?.name}
</h1>

<h2 className="text-xl text-indigo-600 mt-3">
{event?.eventName}
</h2>

<p className="text-gray-500">
Hosted by {event?.hostName}
</p>

</div>

{/* SEARCH */}

<input
placeholder="Search team..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="mb-8 w-full md:w-96 p-3 rounded-xl border focus:ring-2 focus:ring-purple-500"
/>

{/* TEAMS */}

{teams.map(team=>(

<div
key={team}
className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-8 border border-purple-100"
>

<h2 className="text-2xl font-bold text-indigo-700 mb-2">
{team}
</h2>

<p className="text-gray-500 mb-4">
Members: {grouped[team].map(m=>m.name).join(", ")}
</p>

{criteria.map(c=>(

<div key={c._id} className="flex items-center gap-6 mb-4">

<label className="w-48 font-medium text-gray-700">
{c.title}
</label>

<input
type="number"
min="0"
max={c.weight}
value={scores[team]?.[c._id] || ""}
onChange={(e)=>handleScore(team,c._id,e.target.value,c.weight)}
className="border border-purple-200 rounded-lg p-2 w-20"
/>

<span className="text-sm text-gray-400">
max {c.weight}
</span>

</div>

))}

</div>

))}

{/* SUBMIT */}

<button
onClick={submitAll}
className="fixed bottom-10 right-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105"
>
Submit All Scores
</button>

</div>

)

}
