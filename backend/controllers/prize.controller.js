import PrizeClaim from "../models/prizeClaim.model.js";
import { sendWinnerEmail } from "../services/paymentEmail.service.js";

export const sendPrizeEmail = async (req, res) => {
  try {
    const { eventId, team, leader, email, phone, rank, amount } = req.body;

    const loginId = "PRZ-" + Math.floor(100000 + Math.random() * 900000);
    const password = Math.random().toString(36).slice(-8);

    const claim = await PrizeClaim.create({
      eventId,
      teamName: team,
      leader,
      email,
      phone,
      rank,
      amount,
      loginId,
      password,
    });
    if (!email) {
      return res.status(400).json({
        message: "Winner email missing",
      });
    }
    console.log("Sending email to:",email)
    

    const loginURL = `http://localhost:5173/prize-login`;

    await sendWinnerEmail({
      email,
      team,
      rank,
      amount,
      loginId,
      password,
      loginURL,
    });

    res.json({ message: "Email sent" });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Email failed" });
  }
};

export const submitPaymentDetails = async (req,res)=>{

try{

const { id, upi, accountNumber, ifsc } = req.body

const claim = await PrizeClaim.findByIdAndUpdate(
 id,
 { upi, accountNumber, ifsc, status:"submitted" },
 { new:true }
)

res.json(claim)

}catch(err){

console.error(err)

res.status(500).json({ message:"Submit failed" })

}

}

export const prizeLogin = async (req, res) => {

try{

const { loginId, password } = req.body

const claim = await PrizeClaim.findOne({ loginId })

if(!claim){
 return res.status(404).json({ message: "Claim not found" })
}

if(claim.password !== password){
 return res.status(401).json({ message: "Invalid password" })
}

res.json(claim)

}catch(err){

console.error(err)

res.status(500).json({ message: "Login failed" })

}

}

export const getPrizeClaimsByEvent = async (req,res)=>{

try{

const { eventId } = req.params

const claims = await PrizeClaim.find({ eventId })

res.json(claims)

}catch(err){

console.error(err)

res.status(500).json({ message:"Failed to fetch claims" })

}

}