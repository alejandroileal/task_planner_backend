import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { eventController } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/", authenticate, eventController.getEvents());
eventRouter.post("/create", authenticate, eventController.createEvent());
eventRouter.patch(
  "/update/:eventId",
  authenticate,
  eventController.updateEvent()
);
eventRouter.delete(
  "/delete/:eventId",
  authenticate,
  eventController.deleteEvent()
);

export default eventRouter;
