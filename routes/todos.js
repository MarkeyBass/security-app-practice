import express from "express";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todos.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * TODO:
 * Add protect middleware to all routes
 * protect middleware will check if user is logged in to access POST, PUT, DELETE routes
 */

router.route("/")
  .get(getTodos)
  .post(protect, createTodo);
router.route("/:id")
  .get(getTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;

