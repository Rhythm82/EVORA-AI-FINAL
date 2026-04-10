import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../lib/api"

export default function Leaderboard({ eventId }) {

const [teams,setTeams] = useState([])
const navigate = useNavigate()



useEffect(()=>{
if(eventId) load()
},[eventId])

const load = async()=>{

try{

const res = await api.get(`/leaderboard/${eventId}`)
setTeams(res.data)

}catch(err){

console.error("Leaderboard load failed",err)

}

}

const top3 = teams.slice(0,3)
const rest = teams.slice(3)

return(

<div className="p-6">

<h2 className="text-2xl font-bold text-purple-700 mb-6">
Leaderboard
</h2>

{/* PAY PRIZE BUTTON */}

<div className="flex justify-end mb-6">

<button
onClick={()=>navigate(`/evaluation/${eventId}/prize`)}
className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
>
🏆 Pay Prize
</button>

</div>

{/* TOP 3 */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

{top3.map((t,i)=>(

<div
key={i}
className="bg-white shadow-xl rounded-2xl p-6 text-center border border-purple-100"
>

<h3 className="text-lg font-semibold text-gray-700">
{t.teamName}
</h3>

<p className="text-3xl font-bold text-purple-600 my-2">
#{i+1}
</p>

<p className="text-gray-500">
Score {t.score}
</p>

</div>

))}

</div>

{/* OTHER TEAMS */}

<div className="bg-white shadow-xl rounded-2xl overflow-hidden">

<table className="w-full">

<thead className="bg-gray-100">

<tr>
<th className="p-4 text-left">Rank</th>
<th className="p-4 text-left">Team</th>
<th className="p-4 text-left">Score</th>
</tr>

</thead>

<tbody>

{rest.map((t,i)=>(

<tr key={i} className="border-t">

<td className="p-4">{i+4}</td>
<td className="p-4">{t.teamName}</td>
<td className="p-4">{t.score}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}


