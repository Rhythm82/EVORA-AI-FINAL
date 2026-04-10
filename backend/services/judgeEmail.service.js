import nodemailer from "nodemailer"
import ip from "ip"

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:EMAIL_USER,
pass:EMAIL_PASS
}
})

export const sendJudgeEmail = async(email,judgeId,password)=>{

const localIP = ip.address()

const loginURL = `http://${localIP}:5173/judge-login`

await transporter.sendMail({

from:`"EVORA" <${EMAIL_USER}>`,
to:email,
subject:"Judge Access - EVORA",

html:`
<h2>Welcome Judge</h2>

<p>You have been invited to evaluate participants.</p>

<p><b>Login Page:</b> ${loginURL}</p>

<p><b>Judge ID:</b> ${judgeId}</p>

<p><b>Password:</b> ${password}</p>

<p>Please connect to the same WiFi network.</p>
`

})

}