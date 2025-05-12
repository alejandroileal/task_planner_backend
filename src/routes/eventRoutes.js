import express from "express";
import { authotization } from "../middlewares/authMiddleware.js";
import { eventController } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/", eventController.getEvents);
eventRouter.post("/create", authotization, eventController.createEvent);
eventRouter.patch(
  "/update/:eventId",
  authotization,
  eventController.updateEvent
);
eventRouter.delete(
  "/delete/:eventId",
  authotization,
  eventController.deleteEvent
);

export default eventRouter;
