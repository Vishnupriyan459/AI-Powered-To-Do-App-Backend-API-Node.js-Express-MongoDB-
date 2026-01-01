import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  userId: String,
  title: String,
  description: String,
  reminder: Date,
  completed: { type: Boolean, default: false },
  subtasks: [{ text: String, completed: Boolean }]
});

export default model("Task", taskSchema);
