import {
  createTask,
  deleteTask,
  filterTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/taskServices.js";

import fileService from "../services/fileServices.js";
import {
  createTaskValidations,
  deleteTaskValidations,
  filterTaskValidations,
  updateTaskValidations,
} from "../validations/taskValidations.js";

export const taskController = {
  getTasks: [
    async (req, res) => {
      try {
        const tasks = await getTasks(req.userId);
        res.status(200).json({ success: "ok", tasks });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot get tasks" });
      }
    },
  ],
  createTask: [
    ...createTaskValidations,
    async (req, res) => {
      try {
        const { title, description, dueDate, status } = req.body;

        const imgPaths = [];

        for (const file of req.files) {
          const filename = await fileService.uploadFile(file);
          imgPaths.push(`/uploads/${filename}`);
        }

        const addTaskResponse = await createTask({
          title,
          description,
          dueDate,
          status,
          owner: req.userId,
          images: imgPaths,
        });

        const notifyUser = req.app.get("notify-user");
        notifyUser(req.userId, "task-created", {
          message: "Task creada correctamente",
        });

        res.status(201).json({ success: "ok", addTaskResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot create task" });
      }
    },
  ],
  updateTask: [
    ...updateTaskValidations,
    async (req, res) => {
      try {
        const { ...task } = req.body;
        const { taskId } = req.params;

        const currentTask = await getTaskById(taskId);

        const imgPaths = [];

        for (const file of req.files) {
          const filename = await fileService.uploadFile(file);
          imgPaths.push(`/uploads/${filename}`);
        }

        const updatedTaskResponse = await updateTask(taskId, {
          ...task,
          images: [...currentTask.images, ...imgPaths],
        });

        const notifyUser = req.app.get("notify-user");
        notifyUser(req.userId, "task-updated", {
          message: "Task modificada correctamente",
        });

        res.status(200).json({ success: "ok", updatedTaskResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot update task" });
      }
    },
  ],
  deleteTask: [
    ...deleteTaskValidations,
    async (req, res) => {
      try {
        const { taskId } = req.params;

        const deleteTaskResponse = await deleteTask(taskId);

        const notifyUser = req.app.get("notify-user");
        notifyUser(req.userId, "task-deleted", {
          message: "Task eliminada correctamente",
        });
        res.status(200).json({ success: "ok", deleteTaskResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot delete task" });
      }
    },
  ],
  filterTasksByStatus: [
    ...filterTaskValidations,
    async (req, res) => {
      try {
        const { status } = req.params;
        const filerTaskResponse = await filterTask(status);

        res
          .status(200)
          .json({ success: "ok", filteredTasks: filerTaskResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot filter tasks" });
      }
    },
  ],
};
