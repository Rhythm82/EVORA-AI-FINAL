import {
  createEvent,
  getMyEvents,
  deleteEvent,
  updateEvent,
} from "../services/event.service.js";
import Event from "../models/Event.js";

export const create = async (req, res) => {
  try {
    const event = await createEvent(req.body, req.user.id);

    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const events = await getMyEvents(req.user.id);

    res.json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteEvent(req.params.id, req.user.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const event = await updateEvent(req.params.id, req.body, req.user.id);

    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch event",
    });
  }
};
