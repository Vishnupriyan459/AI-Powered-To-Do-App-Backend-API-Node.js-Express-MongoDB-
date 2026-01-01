import express from "express";
import auth from "../middleware/auth.js";
import {
  addTask,
  getTasks,
  getTaskById,
  addSubtasks,
  toggleComplete,
  deleteTask,
  toggleSubtask,
    deleteSubtask,
    resetSubtasks,
    completeAllTasks
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", auth, addTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTaskById);
router.post("/:id/subtasks", auth, addSubtasks);
router.put("/:taskId/subtasks/:index/toggle", auth, toggleSubtask);
router.put("/:id/toggle", auth, toggleComplete);
router.delete("/:id", auth, deleteTask);

router.delete("/:taskId/subtasks/:index", auth, deleteSubtask);
router.put("/:id/subtasks/reset", auth, resetSubtasks);

router.put("/complete/all", auth, completeAllTasks);



export default router;
