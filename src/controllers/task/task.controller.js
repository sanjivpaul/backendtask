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

  try {
  } catch (error) {}
};
const updateTask = async (req, res) => {
  // by id
};
const deleteTask = async (req, res) => {
  // by id
};

export { createTask, getAllTask, getTaskById, updateTask, deleteTask };
