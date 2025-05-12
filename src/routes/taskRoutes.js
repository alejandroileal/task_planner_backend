import express from "express";
import multer from "multer";
import { authenticate, authotization } from "../middlewares/authMiddleware.js";
import { taskController } from "../controllers/taskController.js";

const taskRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 40 * 1024 * 1024,
  },
});

taskRouter.get("/", taskController.getTasks);
taskRouter.get("/filter/:status", taskController.filterTasksByStatus);
taskRouter.post(
  "/create",
  upload.array("images", 10),
  authotization,
  taskController.createTask
);
taskRouter.patch(
  "/update/:taskId",
  upload.array("images", 10),
  authotization,
  taskController.updateTask
);
taskRouter.delete("/delete/:taskId", authotization, taskController.deleteTask);

export default taskRouter;
