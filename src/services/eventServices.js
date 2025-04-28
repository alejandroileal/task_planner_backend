import Event from "../models/Event.js";

export async function getEvents(userId) {
  try {
    const events = await Event.find({ owner: userId });
    return events;
  } catch (error) {
    throw error;
  }
}

export async function createEvent(event) {
  try {
    const newEvent = new Event(event);
    const response = await newEvent.save();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateEvent(eventId, event) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, event);
    return updatedEvent;
  } catch (error) {
    throw error;
  }
}

export async function deleteEvent(eventId) {
  try {
    const deleteEvent = await Event.findByIdAndDelete(eventId);
    return deleteEvent;
  } catch (error) {
    throw error;
  }
}
