import {useState} from "react"
import api from "../../lib/api.js"

export default function EditEventModal({event,close,reload}){

const [form,setForm] = useState(event)

const submit = async()=>{

await api.put(`/events/${event._id}`,form,{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

reload()

close()

}

return(

<div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center">

<div className="bg-white p-8 rounded-xl w-[500px] relative">

<button
onClick={close}
className="absolute top-3 right-3"
>
✕
</button>

<h2 className="text-2xl font-bold mb-6">
Edit Event
</h2>

<input
value={form.eventName}
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,eventName:e.target.value})}
/>

<input
value={form.eventType}
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,eventType:e.target.value})}
/>

<input
value={form.organisation}
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,organisation:e.target.value})}
/>

<textarea
value={form.description}
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,description:e.target.value})}
/>

<button
onClick={submit}
className="bg-purple-700 text-white w-full p-3 rounded-lg"
>
Update Event
</button>

</div>

</div>

)

}