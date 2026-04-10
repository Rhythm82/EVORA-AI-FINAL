import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import api from "../lib/api"

export default function Leaderboard(){

const { eventId } = useParams()
const [teams,setTeams] = useState([])

useEffect(()=>{
load()
},[])

const load = async()=>{

const res = await api.get(`/leaderboard/${eventId}`)
setTeams(res.data)

}

const top3 = teams.slice(0,3)
const rest = teams.slice(3)

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-10 text-purple-700">
Leaderboard
</h1>

{/* podium */}

<div className="grid grid-cols-3 gap-6 mb-10">

{top3.map((t,i)=>(
<div key={i} className="bg-white shadow-xl rounded-xl p-6 text-center">

<h2 className="text-xl font-bold">{t.teamName}</h2>

<p className="text-4xl font-bold text-purple-600">
#{i+1}
</p>

<p className="text-gray-500">
Score {t.score}
</p>

</div>
))}

</div>

{/* table */}

<table className="w-full bg-white shadow-xl rounded-xl">

<thead>

<tr className="border-b">

<th className="p-4">Rank</th>
<th className="p-4">Team</th>
<th className="p-4">Score</th>

</tr>

</thead>

<tbody>

{rest.map((t,i)=>(

<tr key={i} className="border-b">

<td className="p-4">{i+4}</td>
<td className="p-4">{t.teamName}</td>
<td className="p-4">{t.score}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}