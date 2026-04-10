import { useState } from "react"
import api from "../../lib/api"
import ConflictPopup from "./ConflictPopup"

export default function ScheduleEditModal({schedule,close,reload}){

const [data,setData] = useState(schedule)
const [conflict,setConflict] = useState(null)

const save = async ()=>{

try{

await api.put(`/scheduler/${data._id}`,data)

reload()

close()

}catch(err){

if(err.response?.data?.conflictEvent){

setConflict(err.response.data.conflictEvent)

}

}

}

const deleteEvent = async ()=>{

await api.delete(`/scheduler/${data._id}`)

reload()

close()

}

return(

<div className="fixed inset-0 bg-black/40 flex justify-center items-center">

<div className="bg-white p-8 rounded-2xl w-[500px]">

<h2 className="text-xl font-bold mb-4">
Edit Schedule
</h2>

<input
value={data.eventName}
onChange={e=>setData({...data,eventName:e.target.value})}
className="border p-3 w-full mb-4"
/>

<input
type="time"
value={data.startTime}
onChange={e=>setData({...data,startTime:e.target.value})}
className="border p-3 w-full mb-4"
/>

<input
type="time"
value={data.endTime}
onChange={e=>setData({...data,endTime:e.target.value})}
className="border p-3 w-full mb-4"
/>

<div className="flex justify-between mt-6">

<button
onClick={close}
className="px-4 py-2 bg-gray-300 rounded"
>
Back
</button>

<div className="flex gap-3">

<button
onClick={deleteEvent}
className="px-4 py-2 bg-red-500 text-white rounded"
>
Delete
</button>

<button
onClick={save}
className="px-4 py-2 bg-purple-600 text-white rounded"
>
Save
</button>

</div>

</div>

{conflict && (
<ConflictPopup
event={conflict}
close={()=>setConflict(null)}
/>
)}

</div>

</div>

)

}