import { useState } from "react"
import api from "../lib/api"
import { useNavigate } from "react-router-dom"

export default function PrizeLogin(){

const [loginId,setLoginId] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const login = async()=>{

const res = await api.post("/prize/login",{
 loginId,
 password
})

localStorage.setItem("claim", JSON.stringify(res.data))

navigate("/prize-claim")

}

return(

<div className="p-10 max-w-md mx-auto">

<h2 className="text-2xl font-bold mb-4">
Prize Claim Login
</h2>

<input
placeholder="Login ID"
className="border p-3 w-full mb-3"
onChange={(e)=>setLoginId(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-3 w-full mb-3"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={login}
className="bg-purple-600 text-white px-6 py-2 rounded"
>
Login
</button>

</div>

)

}