import { Link, useParams } from "react-router-dom"

export default function MediaManager(){

const {id} = useParams()

return(

<div className="space-y-6">

<Link to={`/listings/${id}/media`}>

<button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold py-6 rounded-xl shadow-lg hover:scale-[1.02] transition">

Generate Media Content

</button>

</Link>

<p className="text-gray-500 max-w-xl">

AI can generate promotional content ideas, captions, campaign strategies and
engagement hooks tailored to your event.  
Use it to create hype across social media and attract more participants.

</p>

</div>

)

}