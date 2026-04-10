import Criteria from "../models/criteria.model.js"

export const createCriteria = async (req,res)=>{

try{

const {eventId,criteria} = req.body

if(!eventId){
return res.status(400).json({message:"EventId required"})
}

if(!criteria || !criteria.length){
return res.status(400).json({message:"No criteria provided"})
}

const saved = await Criteria.insertMany(
criteria.map(c=>({
eventId,
title:c.title,
weight:c.weight,
description:c.description
}))
)

res.json({
message:"Criteria saved successfully",
data:saved
})

}catch(err){

console.error(err)

res.status(500).json({
message:"Criteria creation failed"
})

}

}

export const getCriteriaByEvent = async (req,res)=>{
  try{

    const {eventId} = req.params

    const criteria = await Criteria.find({eventId})

    res.json(criteria)

  }catch(err){

    console.error(err)

    res.status(500).json({
      message:"Failed to fetch criteria"
    })

  }
}