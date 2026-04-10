import Schedule from "../models/schedule.model.js"

export const checkEventConflict = async (startTime, endTime, startDate) => {

  const schedules = await Schedule.find({ startDate })

  for (const s of schedules) {

    if (
      startTime < s.endTime &&
      endTime > s.startTime
    ) {
      return s
    }

  }

  return null

}