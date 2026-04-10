import { useState } from "react";
import { v4 as uuid } from "uuid";
import api from "../../lib/api";
import toast from "react-hot-toast";
import ConflictPopup from "./ConflictPopup";
import ScheduleListModal from "./ScheduleListModal";
export default function ScheduleForm({ eventId }) {

const emptyEvent = {
event_id: uuid(),
event_name:"",
start_time:"",
end_time:"",
start_date:"",
end_date:"",
description:""
}

const [events,setEvents] = useState([
{...emptyEvent,event_id:uuid()}
])

const [loading,setLoading] = useState(false)
const [conflict,setConflict] = useState(null)
const [openList,setOpenList] = useState(false)

const addEvent = () => {

setEvents([
...events,
{
event_id: uuid(),
event_name:"",
start_time:"",
end_time:"",
start_date:"",
end_date:"",
description:""
}
])

}


const updateField = (index,field,value)=>{

const updated=[...events]

updated[index][field]=value

setEvents(updated)

}


const resetForm = () => {

setEvents([
{...emptyEvent,event_id:uuid()}
])

}


const submitSchedules = async () => {

try{

setLoading(true)

/* remove empty events */

const validEvents = events.filter(e =>
e.event_name &&
e.start_time &&
e.end_time &&
e.start_date &&
e.end_date
)

/* remove duplicates */

const uniqueEvents = []

const seen = new Set()

for(const ev of validEvents){

const key = `${ev.event_name}-${ev.start_time}-${ev.end_time}-${ev.start_date}`

if(!seen.has(key)){
seen.add(key)
uniqueEvents.push(ev)
}

}

await api.post("/scheduler/create",{events:uniqueEvents})

toast.success("Schedules saved successfully")

resetForm()

}catch(err){

if(err.response?.status === 409){

setConflict(err.response.data.conflictEvent)

}else{

toast.error("Schedule creation failed")

}

resetForm()

}

setLoading(false)

}


return(

<div className="space-y-8">

{/* HEADER */}

<div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-purple-200">

<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">

Event Scheduler

</h2>

<p className="text-gray-500">

Plan your event timeline and automate reminders to participants.

</p>

</div>


{/* EVENT FORMS */}

{events.map((ev,i)=>(

<div
key={i}
className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-purple-200 shadow-lg grid md:grid-cols-3 gap-4"
>

{/* EVENT NAME */}

<div>

<label className="text-xs text-gray-500 mb-1 block">
Event Name
</label>

<input
value={ev.event_name}
onChange={e=>updateField(i,"event_name",e.target.value)}
className="p-3 rounded-lg border w-full"
/>

</div>


{/* START DATE */}

<div>

<label className="text-xs text-gray-500 mb-1 block">
Start Date
</label>

<input
type="date"
value={ev.start_date}
onChange={e=>updateField(i,"start_date",e.target.value)}
className="p-3 rounded-lg border w-full"
/>

</div>


{/* END DATE */}

<div>

<label className="text-xs text-gray-500 mb-1 block">
End Date
</label>

<input
type="date"
value={ev.end_date}
onChange={e=>updateField(i,"end_date",e.target.value)}
className="p-3 rounded-lg border w-full"
/>

</div>


{/* START TIME */}

<div>

<label className="text-xs text-gray-500 mb-1 block">
Start Time
</label>

<input
type="time"
value={ev.start_time}
onChange={e=>updateField(i,"start_time",e.target.value)}
className="p-3 rounded-lg border w-full"
/>

</div>


{/* END TIME */}

<div>

<label className="text-xs text-gray-500 mb-1 block">
End Time
</label>

<input
type="time"
value={ev.end_time}
onChange={e=>updateField(i,"end_time",e.target.value)}
className="p-3 rounded-lg border w-full"
/>

</div>


{/* DESCRIPTION */}

<div className="md:col-span-3">

<label className="text-xs text-gray-500 mb-1 block">
Description
</label>

<input
value={ev.description}
onChange={e=>updateField(i,"description",e.target.value)}
className="p-3 rounded-lg border w-full"
/>

</div>

</div>

))}


{/* BUTTONS */}

<div className="flex gap-4">

<button
onClick={addEvent}
className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl shadow hover:scale-105 transition"
>

+ Add Schedule

</button>


<button
onClick={submitSchedules}
disabled={loading}
className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow flex items-center gap-2"
>

{loading ? "Saving..." : "Save Schedules"}

</button>

<button
onClick={()=>setOpenList(true)}
className="bg-white border border-purple-200 text-purple-700 px-6 py-3 rounded-xl hover:bg-purple-50 transition"
>
View All Schedules


</button>

</div>


{/* CONFLICT POPUP */}

{conflict && (

<ConflictPopup
event={conflict}
close={()=>setConflict(null)}
/>

)}

{openList && (
<ScheduleListModal
close={()=>setOpenList(false)}
/>
)}

</div>

)

}