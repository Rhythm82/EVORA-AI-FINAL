import Event from "../models/Event.js"

export const createEvent = async(data,userId)=>{

const event = await Event.create({
...data,
createdBy:userId
})

return event

}

export const getMyEvents = async(userId)=>{

return await Event.find({createdBy:userId}).sort({createdAt:-1})

}

export const deleteEvent = async(id,userId)=>{

return await Event.findOneAndDelete({_id:id,createdBy:userId})

}

export const updateEvent = async(id,data,userId)=>{

return await Event.findOneAndUpdate(
{_id:id,createdBy:userId},
data,
{new:true}
)

}