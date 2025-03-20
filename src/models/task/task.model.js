import mongoose, { Schema } from "mongoose";
import { User } from "../user/user.model.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: false,
    },
    completed_at: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referring to the User model
      required: true, // Make sure it's required if each task should be associated with a user
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
