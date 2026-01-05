import express from "express";
import {  signin } from "../controllers/auth.js";

const router = express.Router();

router.route("/signin")
  .get(signin)

export default router;

