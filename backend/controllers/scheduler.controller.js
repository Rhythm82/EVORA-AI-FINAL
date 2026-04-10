import Schedule from "../models/schedule.model.js";
import { generateScheduleFromAI } from "../services/schedulerAI.service.js";
import { checkEventConflict } from "../services/conflict.service.js";

export const createSchedules = async (req, res) => {
  try {
    const { events } = req.body;

    if (!events || !events.length) {
      return res.status(400).json({
        message: "No events provided",
      });
    }

    const aiResponse = await generateScheduleFromAI(events);

    if (!aiResponse || !Array.isArray(aiResponse.results)) {
      return res.status(500).json({
        message: "AI scheduler returned invalid data",
      });
    }

    const savedEvents = [];

    for (const event of events) {

      /* FIND REMINDER TASK */
      const reminderTask = aiResponse.results.find(
        r =>
          r.eventId === event.event_id &&
          r.instruction?.toLowerCase().includes("reminder")
      );

      if (!reminderTask) continue;

      /* 🔴 CONFLICT CHECK */
      const conflict = await Schedule.findOne({
        startDate: event.start_date,
        $or: [
          {
            startTime: { $lt: event.end_time },
            endTime: { $gt: event.start_time }
          }
        ]
      });

      if (conflict) {
        return res.status(409).json({
          message: "Schedule conflict",
          conflictEvent: {
            eventName: conflict.eventName,
            startTime: conflict.startTime,
            endTime: conflict.endTime
          }
        });
      }

      const scheduleData = {
        eventId: event.event_id,
        eventName: event.event_name,
        startDate: event.start_date,
        endDate: event.end_date,
        startTime: event.start_time,
        endTime: event.end_time,
        description: event.description,
        triggerTime: reminderTask.triggerTime,
        instruction: reminderTask.instruction
      };

      const schedule = await Schedule.findOneAndUpdate(
        { eventId: event.event_id },
        scheduleData,
        { returnDocument: "after", upsert: true }
      );

      savedEvents.push(schedule);
    }

    res.json({
      message: "Schedules created successfully",
      data: savedEvents
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Schedule creation failed"
    });
  }
};
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ startDate: 1 });

    res.json(schedules);
  } catch (err) {
    res.status(500).json({
      message: "Fetching schedules failed",
    });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Schedule.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    await Schedule.findByIdAndDelete(id);

    res.json({
      message: "Schedule deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};
