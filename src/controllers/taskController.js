import {
  createTask,
  deleteTask,
  filterTask,
  getTasks,
  updateTask,
} from "../services/taskServices.js";
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
        const { title, description, dueDate, status, userId } = req.body;

        const addTaskResponse = await createTask({
          title,
          description,
          dueDate,
          status,
          owner: userId,
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
        const { userId, ...task } = req.body;
        const { taskId } = req.params;

        const updatedTaskResponse = await updateTask(taskId, task);
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
