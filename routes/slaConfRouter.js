import express from "express";
import {
  getMStep,
  addMStep,
  updateMStep,
  deleteMStep,
} from "../controller/slaConfController.js";

export const slaConfRouter = express.Router();

// GET
slaConfRouter.get("/", getMStep);
slaConfRouter.get("/:id_sla", getMStep);

// POST
slaConfRouter.post("/", addMStep);

// PUT
slaConfRouter.put("/:id_sla", updateMStep);

// DELETE
slaConfRouter.delete("/:id_sla", deleteMStep);
