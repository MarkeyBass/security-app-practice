import express from "express";
import { signin, login } from "../controllers/auth.js";

const router = express.Router();

router.route("/signin")
  .post(signin)

router.route("/login")
  .post(login)

export default router;

