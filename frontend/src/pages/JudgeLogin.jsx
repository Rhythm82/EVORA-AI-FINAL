import { useState } from "react"
import api from "../lib/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function JudgeLogin(){

const [judgeId,setJudgeId] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const login = async()=>{

try{

const res = await api.post("/judge/login",{
judgeId,
password
})

localStorage.setItem("judge",JSON.stringify(res.data.judge))

navigate(`/judge/score/${res.data.judge.eventId}`)

}catch(err){

toast.error("Login failed")

}

}

return(

<div className="p-10 max-w-md mx-auto">

<h2 className="text-2xl font-bold mb-4">
Judge Login
</h2>

<input
placeholder="Judge ID"
value={judgeId}
onChange={e=>setJudgeId(e.target.value)}
className="border p-2 w-full mb-3"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
className="border p-2 w-full mb-3"
/>

<button
onClick={login}
className="bg-purple-600 text-white px-5 py-2 rounded"
>
Login
</button>

</div>

)
}