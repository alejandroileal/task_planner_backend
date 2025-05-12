import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../services/eventServices.js";
import { fetchWeather } from "../utils/weather.js";
import {
  createEventValidations,
  deleteEventValidations,
  updateEventValidations,
} from "../validations/eventValidations.js";

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
    ...createEventValidations,
    async (req, res) => {
      try {
        const { ...event } = req.body;

        const weatherData = await fetchWeather(
          event.date,
          "96cb6093c994e234f88e5034dd735bea"
        );

        const addEventResponse = await createEvent({
          ...event,
          owner: req.userId,
          weatherData,
        });

        const notifyUser = req.app.get("notify-user");

        notifyUser(req.userId, "event-created", {
          message: "Evento creado correctamente",
        });

        res.status(201).json({ success: "ok", addEventResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot create event" });
      }
    },
  ],
  updateEvent: [
    ...updateEventValidations,
    async (req, res) => {
      try {
        const { ...event } = req.body;
        const { eventId } = req.params;

        const weatherData = await fetchWeather(
          event.date,
          "96cb6093c994e234f88e5034dd735bea"
        );

        const updatedEventResponse = await updateEvent(eventId, {
          ...event,
          weatherData,
        });

        const notifyUser = req.app.get("notify-user");

        notifyUser(req.userId, "event-updated", {
          message: "Evento modificado correctamente",
        });
        res.status(200).json({ success: "ok", updatedEventResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot update event" });
      }
    },
  ],
  deleteEvent: [
    ...deleteEventValidations,
    async (req, res) => {
      try {
        const { eventId } = req.params;

        const deleteEventResponse = await deleteEvent(eventId);
        const notifyUser = req.app.get("notify-user");

        notifyUser(req.userId, "event-deleted", {
          message: "Evento eliminado correctamente",
        });
        res.status(200).json({ success: "ok", deleteEventResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot delete event" });
      }
    },
  ],
};
