import { useState } from "react"
import CriteriaForm from "../components/evaluation/CriteriaForm"
import JudgeManager from "../components/evaluation/JudgeManager"
import Leaderboard from "../components/evaluation/Leaderboard"
import "../styles/evaluation.css"
import { useParams } from "react-router-dom"

export default function EvaluationPage(){

const { id } = useParams()   // get eventId from route

const [tab,setTab] = useState("criteria")

return(

<div className="evaluation-container">

<h1 className="evaluation-title">
Event Evaluation System
</h1>

<p className="evaluation-sub">
Create judging criteria, invite judges, and monitor live scoring.
</p>

<div className="evaluation-tabs">

<button
className={tab==="criteria"?"active":""}
onClick={()=>setTab("criteria")}
>
Criteria
</button>

<button
className={tab==="judges"?"active":""}
onClick={()=>setTab("judges")}
>
Judges
</button>

<button
className={tab==="leaderboard"?"active":""}
onClick={()=>setTab("leaderboard")}
>
Leaderboard
</button>

</div>

<div className="evaluation-content">

{tab==="criteria" && <CriteriaForm eventId={id}/>}

{tab==="judges" && <JudgeManager eventId={id}/>}

{tab==="leaderboard" && <Leaderboard eventId={id}/>}

</div>

</div>

)

}