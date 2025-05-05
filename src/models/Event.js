import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  weatherData: {
    temp: { type: Number, required: true },
    temp_min: { type: Number, required: true },
    temp_max: { type: Number, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
