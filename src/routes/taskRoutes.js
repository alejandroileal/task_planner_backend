import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { taskController } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/", authenticate, taskController.getTasks);
taskRouter.get("/filter/:status", taskController.filterTasksByStatus);
taskRouter.post("/create", authenticate, taskController.createTask);
taskRouter.patch("/update/:taskId", authenticate, taskController.updateTask);
taskRouter.delete("/delete/:taskId", authenticate, taskController.deleteTask);

export default taskRouter;
