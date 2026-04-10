import { useEffect, useState } from "react"
import api from "../../lib/api"
import ScheduleEditModal from "./ScheduleEditModal"

export default function ScheduleListModal({ close }) {

const [schedules,setSchedules] = useState([])
const [editing,setEditing] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{
load()
},[])

const load = async () => {
try{

const res = await api.get("/scheduler")
setSchedules(res.data)

}catch(err){
console.error("Failed to load schedules",err)
}

setLoading(false)
}

return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white w-[700px] p-8 rounded-2xl shadow-xl">

<h2 className="text-2xl font-bold mb-6">
All Schedules
</h2>

<div className="space-y-4">

{loading ? (

<p className="text-gray-500">
Loading schedules...
</p>

) : schedules.length === 0 ? (

<p className="text-gray-500">
No schedules found
</p>

) : (

schedules.map((s)=>(
<div
key={s._id}
className="flex justify-between items-center border p-4 rounded-lg hover:bg-purple-50 transition"
>

<div>
<p className="font-semibold">{s.eventName}</p>
<p className="text-sm text-gray-500">
{s.startTime} - {s.endTime}
</p>
</div>

<button
onClick={()=>setEditing(s)}
className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
>
Edit
</button>

</div>
))

)}

</div>

<button
onClick={close}
className="mt-6 text-gray-500 hover:text-purple-600"
>
Close
</button>

{editing && (
<ScheduleEditModal
schedule={editing}
close={()=>setEditing(null)}
reload={load}
/>
)}

</div>

</div>

)

}