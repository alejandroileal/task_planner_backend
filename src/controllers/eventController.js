import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../services/eventServices.js";

export const eventController = {
  getEvents: [
    async (req, res) => {
      try {
        const events = await getEvents(req.userId);
        res.status(200).json({ success: "ok", events });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot get events" });
      }
    },
  ],
  createEvent: [
    async (req, res) => {
      try {
        const { userId, ...event } = req.body;

        // Agregar lógica que se obtiene de las APIS externas

        const addEventResponse = await createEvent({
          ...event,
          owner: userId,
        });

        res.status(201).json({ success: "ok", addEventResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot create event" });
      }
    },
  ],
  updateEvent: [
    async (req, res) => {
      try {
        const { userId, ...event } = req.body;
        const { eventId } = req.params;

        // Agregar lógica que se obtiene de las APIS externas

        const updatedEventResponse = await updateEvent(eventId, event);
        res.status(200).json({ success: "ok", updatedEventResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot update event" });
      }
    },
  ],
  deleteEvent: [
    async (req, res) => {
      try {
        const { eventId } = req.params;

        const deleteEventResponse = await deleteEvent(eventId);
        res.status(200).json({ success: "ok", deleteEventResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot delete event" });
      }
    },
  ],
};
