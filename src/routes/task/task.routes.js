import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../../controllers/task/task.controller.js";
import { verifyJwt } from "../../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJwt);
router.route("/").post(createTask);
router.route("/").get(getAllTask);
router.route("/:id").get(getTaskById);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);

export default router;
