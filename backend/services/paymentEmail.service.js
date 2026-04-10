import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL_USER,
pass:process.env.EMAIL_PASS
}
})

export const sendWinnerEmail = async(data)=>{

await transporter.sendMail({

from:`EVORA <${process.env.EMAIL_USER}>`,
to:data.email,
subject:"🎉 Congratulations! Claim Your Prize",

html:`

<h2>Congratulations ${data.team}</h2>

<p>You finished Rank #${data.rank}</p>

<p>Prize Amount: ₹${data.amount}</p>

<p>Login to submit payment details:</p>

<a href="${data.loginURL}">
Claim Prize
</a>

<p>Login ID: <b>${data.loginId}</b></p>
<p>Password: <b>${data.password}</b></p>

`

})

}