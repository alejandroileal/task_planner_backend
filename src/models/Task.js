import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pendiente", "en proceso", "completada"],
    default: "pendiente",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  images: {
    type: [String],
    default: [],
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
