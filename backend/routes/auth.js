import express from "express";
import { getStudentProfile, createStudent } from "../controllers/auth.js";
const router = express.Router();

router.get("/me", getStudentProfile);
router.post("/signup", createStudent);
