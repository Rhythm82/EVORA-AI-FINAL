import { useState } from "react"
import api from "../lib/api"

export default function PrizeClaim(){

const claim = JSON.parse(localStorage.getItem("claim"))

const [data,setData] = useState({
upi:"",
accountNumber:"",
ifsc:""
})

const submit = async()=>{

await api.post("/prize/submit",{

id:claim._id,
...data

})

alert("Payment details submitted")

}

return(

<div className="p-10 max-w-lg mx-auto">

<h1 className="text-2xl font-bold mb-6">
Submit Payment Details
</h1>

<input
placeholder="UPI ID"
className="border p-3 w-full mb-3"
onChange={(e)=>setData({...data,upi:e.target.value})}
/>

<input
placeholder="Account Number"
className="border p-3 w-full mb-3"
onChange={(e)=>setData({...data,accountNumber:e.target.value})}
/>

<input
placeholder="IFSC Code"
className="border p-3 w-full mb-3"
onChange={(e)=>setData({...data,ifsc:e.target.value})}
/>

<button
onClick={submit}
className="bg-indigo-600 text-white px-6 py-2 rounded"
>
Submit
</button>

</div>

)

}