import Task from "../models/Task.js";

export async function getTasks(userId) {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw error;
  }
}

export async function createTask(task) {
  try {
    const newTask = new Task(task);
    const response = await newTask.save();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateTask(taskId, task) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, task);
    return updatedTask;
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(taskId) {
  try {
    const deleteTask = await Task.findByIdAndDelete(taskId);
    return deleteTask;
  } catch (error) {
    throw error;
  }
}

export async function filterTask(status) {
  try {
    const filterTask = await Task.find({ status });
    return filterTask;
  } catch (error) {
    throw error;
  }
}
