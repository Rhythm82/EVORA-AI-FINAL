import { useState } from "react"
import api from "../lib/api"
import { useNavigate } from "react-router-dom"

export default function LoginModal({ close }) {

const navigate = useNavigate()

const [identifier,setIdentifier] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

const submit = async () => {

try{

const res = await api.post("/auth/login",{
identifier,
password
})

localStorage.setItem("token",res.data.token)

close()

navigate("/dashboard")

}catch(err){
setError("Invalid login details")
}

}

return(

<div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

<div className="bg-white/30 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-80 shadow-xl relative">

{/* CLOSE BUTTON */}

<button
onClick={close}
className="absolute top-3 right-3 text-xl font-bold"
>
✕
</button>

<h2 className="text-xl font-bold mb-4 text-center">Login</h2>

{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

<input
placeholder="Email or Username"
className="border p-2 w-full mb-3 rounded"
onChange={e=>setIdentifier(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-2 w-full mb-4 rounded"
onChange={e=>setPassword(e.target.value)}
/>

<button
onClick={submit}
className="bg-purple-600 hover:bg-purple-700 text-white w-full p-2 rounded"
>
Login
</button>

</div>
</div>

)
}