import {useState} from "react"
import api from "../../lib/api.js"

export default function CreateEventModal({close}){

const [form,setForm] = useState({})

const submit = async()=>{

await api.post("/events",form,{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

close()

}

return(

<div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center">

<div className="bg-white/80 backdrop-blur-xl p-8 rounded-xl w-[500px] relative">

<button
onClick={close}
className="absolute right-4 top-4"
>
✕
</button>

<h2 className="text-2xl font-bold mb-6">
Create Event
</h2>

<input
placeholder="Event Name"
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,eventName:e.target.value})}
/>

<input
placeholder="Event Type"
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,eventType:e.target.value})}
/>

<input
placeholder="Organisation"
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,organisation:e.target.value})}
/>

<input
placeholder="Host Name"
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,hostName:e.target.value})}
/>

<input
placeholder="Host Email"
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,hostEmail:e.target.value})}
/>

<input
placeholder="Host Phone"
className="border p-2 w-full mb-3"
onChange={e=>setForm({...form,hostPhone:e.target.value})}
/>

<textarea
placeholder="Event Description"
className="border p-2 w-full mb-4"
/>

<button
onClick={submit}
className="bg-purple-700 text-white w-full p-3 rounded-lg"
>
Create Event
</button>

</div>

</div>

)
}