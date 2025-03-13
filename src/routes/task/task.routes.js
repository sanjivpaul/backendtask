import { Router } from "express";
import {
  createTask,
  getAllTask,
} from "../../controllers/task/task.controller.js";

const router = Router();

router.route("/").post(createTask);
router.route("/").get(getAllTask);

export default router;
