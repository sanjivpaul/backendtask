import mongoose from "mongoose";
import { Task } from "../../models/task/task.model.js";

// protected routes if user is login have refresh token then he get tasks
const createTask = async (req, res) => {
  const { title, description, status, priority, due_date } = req.body;

  try {
    if (
      [title, description, status, priority].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      due_date,
    });

    if (!task) {
      return res
        .status(500)
        .send({ message: "Something went wrong while creating task" });
    }

    return res.status(201).send({
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error On Register" });
  }
};
const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find();

    if (allTask.length === 0) {
      return res.status(404).json({ message: "No Task found" });
    }

    return res.status(201).json({
      message: "Tasks fetched successfully",
      data: allTask,
    });
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    return res.status(500).json({
      message: "Internal Server Error on get all Tasks",
      error: error.message,
    });
  }
};
const getTaskById = async (req, res) => {
  const { id } = req.params;

  console.log("id", id);

  try {
    // Check if id is valid
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ message: "Invalid or missing ID for fetching task!" });
    }

    // Find task by ID
    const task = await Task.findById(id);

    // console.log("task", task);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(201).send({
      message: "Task fetched successfully",
      data: task,
      status: true,
    });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging purposes
    return res
      .status(500)
      .send({ message: "Internal Server Error while fetching Task" });
  }
};
const updateTask = async (req, res) => {
  // by id
  const { id } = req.params;
  const { title, description, status, priority, due_date } = req.body;

  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ message: "Invalid or missing ID for fetching task!" });
    }

    const task = await Task.findByIdAndUpdate(id);
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.due_date = due_date || task.due_date;

    await task.save();

    return res.status(201).send({
      message: "Update successfully",
      data: task,
      status: true,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error on update Task" });
  }
};
const deleteTask = async (req, res) => {
  // by id
  const { id } = req.params;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ message: "Invalid or missing ID for fetching task!" });
    }

    const taskDelete = await Task.findByIdAndDelete(id);

    if (!taskDelete) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(201).send({
      message: "Task deleted successfully",
      data: taskDelete,
      status: true,
    });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging purposes
    return res
      .status(500)
      .send({ message: "Internal Server Error while deleting Task" });
  }
};

export { createTask, getAllTask, getTaskById, updateTask, deleteTask };
