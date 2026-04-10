import { useState } from "react"

export default function EditProfileModal({username,close}){

const [name,setName] = useState(username)

return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white p-8 rounded-2xl w-96 shadow-xl">

<h2 className="text-xl font-bold mb-6">
Edit Profile
</h2>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border p-2 rounded mb-4"
/>

<div className="flex justify-end gap-3">

<button
onClick={close}
className="px-4 py-2 bg-gray-200 rounded"
>
Cancel
</button>

<button
className="px-4 py-2 bg-purple-600 text-white rounded"
>
Save
</button>

</div>

</div>

</div>

)

}