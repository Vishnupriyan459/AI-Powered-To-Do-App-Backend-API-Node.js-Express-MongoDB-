// controllers/taskController.js
import Task from "../models/Task.js";
import suggestSubtasks from "./groqHelper.js";

// ADD TASK + AI SUGGESTIONS
export async function addTask(req, res) {
  const { title, description, reminder } = req.body;

  const task = await Task.create({
    userId: req.user,
    title,
    description,
    reminder,
    completed: false,
    subtasks: []
  });

  const suggestions = await suggestSubtasks(title, description);
  res.json({ task, suggestions });
}

// GET ALL TASKS FOR USER
export async function getTasks(req, res) {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
}

// GET SINGLE TASK
export async function getTaskById(req, res) {
  const task = await Task.findById(req.params.id);
  res.json(task);
}

// ADD SUBTASK(S)
export async function addSubtasks(req, res) {
  const { subtasks } = req.body;
  const task = await Task.findById(req.params.id);

  task.subtasks.push(...subtasks.map((t) => ({ text: t, completed: false })));
  task.completed = false; // whenever subtasks added -> task becomes NOT completed

  await task.save();
  res.json(task);
}

// TOGGLE A SUBTASK
export async function toggleSubtask(req, res) {
  const { taskId, index } = req.params;
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ msg: "Task not found" });

  if (!task.subtasks[index])
    return res.status(404).json({ msg: "Subtask not found" });

  // toggle boolean
  task.subtasks[index].completed = !task.subtasks[index].completed;

  // recalc main task completed status
  const allDone = task.subtasks.length > 0 && task.subtasks.every(t => t.completed);
  task.completed = allDone;

  await task.save();
  res.json(task);
}

// MAIN TASK COMPLETE
// Only completes if every subtask is completed
export async function toggleComplete(req, res) {
  const task = await Task.findById(req.params.id);

  // If subtask exists -> must ALL be true
  if (task.subtasks.length > 0) {
    const allDone = task.subtasks.every((t) => t.completed);
    if (!allDone) return res.status(400).json({ msg: "Finish all subtasks first!" });
  }

  task.completed = true;
  await task.save();
  res.json(task);
}

// RESET ALL SUBTASKS FOR A TASK
export async function resetSubtasks(req, res) {
  const task = await Task.findById(req.params.id);

  task.subtasks = task.subtasks.map((t) => ({ ...t, completed: false }));
  task.completed = false;

  await task.save();
  res.json(task);
}

// DELETE A SUBTASK
export async function deleteSubtask(req, res) {
  const { taskId, index } = req.params;
  const task = await Task.findById(taskId);

  if (!task) return res.status(404).json({ msg: "Task not found" });
  if (!task.subtasks[index])
    return res.status(404).json({ msg: "Subtask not found" });

  task.subtasks.splice(index, 1);
  const allDone = task.subtasks.length > 0 && task.subtasks.every(t => t.completed);
  task.completed = allDone;

  await task.save();
  res.json(task);
}

// DELETE MAIN TASK
export async function deleteTask(req, res) {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
}

// controllers/taskController.js
export async function completeAllTasks(req, res) {
  try {
    const userId = req.user;

    // find all tasks for user
    const tasks = await Task.find({ userId });

    if (!tasks || tasks.length === 0) {
      return res.json({ msg: "No tasks found" });
    }

    // update each task
    tasks.forEach((task) => {
      task.completed = true;
      // if subtasks exist → mark all subtasks completed
      if (task.subtasks.length > 0) {
        task.subtasks = task.subtasks.map(t => ({ ...t, completed: true }));
      }
    });

    await Promise.all(tasks.map((task) => task.save()));

    res.json({ msg: "All tasks marked as complete", tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}
