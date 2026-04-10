import {useState} from "react"
import api from "../lib/api"
import {useNavigate} from "react-router-dom"

export default function SignupModal({close}){

const navigate = useNavigate()

const [form,setForm] = useState({
username:"",
email:"",
phone:"",
organisation:"",
password:""
})

const [error,setError] = useState("")

const submit = async () => {

try{

const res = await api.post("/auth/signup",form)

localStorage.setItem("token",res.data.token)

close()

navigate("/dashboard")

}catch(err){
setError("Signup failed")
}

}

return(

<div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

<div className="bg-white/30 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-96 shadow-xl relative">

{/* CLOSE BUTTON */}

<button
onClick={close}
className="absolute top-3 right-3 text-xl font-bold"
>
✕
</button>

<h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

<input
placeholder="Username"
className="border p-2 w-full mb-2 rounded"
onChange={e=>setForm({...form,username:e.target.value})}
/>

<input
placeholder="Email"
className="border p-2 w-full mb-2 rounded"
onChange={e=>setForm({...form,email:e.target.value})}
/>

<input
placeholder="Phone"
className="border p-2 w-full mb-2 rounded"
onChange={e=>setForm({...form,phone:e.target.value})}
/>

<input
placeholder="Organisation"
className="border p-2 w-full mb-2 rounded"
onChange={e=>setForm({...form,organisation:e.target.value})}
/>

<input
type="password"
placeholder="Password"
className="border p-2 w-full mb-4 rounded"
onChange={e=>setForm({...form,password:e.target.value})}
/>

<button
onClick={submit}
className="bg-purple-600 hover:bg-purple-700 text-white w-full p-2 rounded"
>
Sign Up
</button>

</div>

</div>

)
}