import Razorpay from "razorpay"

const razorpay = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createPaymentLink = async(req,res)=>{

try{

const { amount, team } = req.body

const payment = await razorpay.paymentLink.create({

amount: amount * 100,
currency: "INR",
description: `Prize payout for ${team}`,

customer:{
name: team
},

notify:{
email:false,
sms:false
}

})

res.json(payment)

}catch(err){

console.error(err)
res.status(500).json({message:"Payment failed"})

}

}