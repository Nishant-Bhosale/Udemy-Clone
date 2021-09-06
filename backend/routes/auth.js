import express from "express";
import { getStudentProfile } from "../controllers/auth.js";
const router = express.Router();

router.get("/me", getStudentProfile);
