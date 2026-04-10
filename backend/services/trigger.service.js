import cron from "node-cron"
import Schedule from "../models/schedule.model.js"
import Participant from "../models/participant.model.js"
import { generateEmailsFromAI } from "./aiEmail.service.js"
import { sendBulkEmails } from "./email.service.js"



export const startTriggerEngine = () => {

console.log("Trigger Engine Started")

// runs every minute
cron.schedule("* * * * *", async () => {

try{

const now = new Date()

// find schedules ready to trigger
const schedules = await Schedule.find({
triggerTime: { $lte: now },
status: "scheduled"
})

if(!schedules.length) return

for(const schedule of schedules){

console.log("Triggering schedule:",schedule.eventId)

const participants = await Participant.find()

if(!participants.length){
console.log("No participants found")
continue
}

const dataForAI = participants.map(p=>({
name:p.name,
email:p.email
}))

// generate emails from instruction
const aiResponse = await generateEmailsFromAI(
schedule.instruction,
dataForAI
)

// format emails
const formattedEmails = aiResponse.emails.map(e=>({
to: e.to || e.email,
subject: e.subject,
body: e.body || e.message
}))

// send emails
await sendBulkEmails(formattedEmails)

// mark schedule completed
schedule.status = "completed"
await schedule.save()

console.log("Emails sent for event:",schedule.eventId)

}

}catch(err){

console.error("Trigger Engine Error:",err)

}

})

}