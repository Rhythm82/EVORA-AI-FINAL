import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import api from "../lib/api"
import toast from "react-hot-toast"

export default function PrizeSetup(){

const { id } = useParams()

const [winners,setWinners] = useState([])
const [claims,setClaims] = useState([])
const [tab,setTab] = useState(0)

const [amounts,setAmounts] = useState({
0:"",
1:"",
2:""
})

useEffect(()=>{
load()
},[])

const load = async()=>{

try{

const res = await api.get(`/leaderboard/${id}`)
setWinners(res.data.slice(0,3))

const claimRes = await api.get(`/prize/event/${id}`)
setClaims(claimRes.data)

/* IMPORTANT PART */

claimRes.data.forEach((c)=>{

setAmounts(prev=>({

...prev,
[c.rank-1]: c.amount

}))

})

}catch(err){

toast.error("Failed to load data")

}

}
const updateAmount = (value)=>{
setAmounts(prev=>({
...prev,
[tab]:value
}))
}

const sendEmail = async()=>{

const winner = winners[tab]

await api.post("/prize/send",{

eventId:id,
team:winner.teamName,
leader:winner.leader,
email:winner.email,
phone:winner.phone,
rank:tab+1,
amount:amounts[tab]

})

toast.success("Email sent")

}
const sendPayment = async()=>{

const winner = winners[tab]

const res = await api.post("/payment/create",{

team:winner.teamName,
amount:amounts[tab]

})

window.open(res.data.short_url)

}
const winner = winners[tab]

const claim = claims.find(c=>c.rank===tab+1)

return(

<div className="p-10 max-w-3xl mx-auto">

<h1 className="text-3xl font-bold text-purple-700 mb-8">
Prize Distribution
</h1>

{/* TABS */}

<div className="flex gap-4 mb-8">

{["#1 Place","#2 Place","#3 Place"].map((t,i)=>(

<button
key={i}
onClick={()=>setTab(i)}
className={`px-6 py-3 rounded-xl font-semibold transition ${
tab===i
? "bg-purple-600 text-white"
: "bg-gray-200 text-gray-700"
}`}
>
{t}
</button>

))}

</div>

{winner && (

<div className="bg-white shadow-xl rounded-2xl p-8">

<h2 className="text-2xl font-bold text-indigo-600 mb-2">
{winner.teamName}
</h2>

<p className="text-gray-600 mb-1">
Rank #{tab+1}
</p>

<p className="text-gray-500 mb-4">
Leader: {winner.leader}
</p>

{/* PRIZE INPUT */}

<div className="mb-6">

<label className="font-medium">
Prize Amount
</label>

<input
type="number"
value={amounts[tab]}
disabled={claim}
onChange={(e)=>updateAmount(e.target.value)}
className={`w-full border p-3 rounded-lg mt-2 ${
claim ? "bg-gray-200 cursor-not-allowed" : ""
}`}
/>

</div>

{/* SEND EMAIL BUTTON */}

<button
disabled={claim}
onClick={sendEmail}
className={`w-full py-3 rounded-xl shadow transition ${
claim
? "bg-gray-400 cursor-not-allowed"
: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105"
}`}
>
{claim ? "Email Sent" : "Send Email to Winner"}
</button>

{/* SHOW PAYMENT DETAILS */}

{claim && (

<div className="mt-8 border-t pt-6">

<h3 className="text-lg font-semibold mb-3">
Payment Details Submitted
</h3>

<p className="text-gray-600">
UPI: {claim.upi || "-"}
</p>

<p className="text-gray-600">
Account: {claim.accountNumber || "-"}
</p>

<p className="text-gray-600">
IFSC: {claim.ifsc || "-"}
</p>

<p className="text-green-600 mt-2">
Status: {claim.status}
</p>

<button
onClick={sendPayment}
className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
>
Send Payment (Razorpay Demo)
</button>

</div>



)}

</div>

)}

</div>

)

}