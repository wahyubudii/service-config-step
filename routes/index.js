import express from "express";
import { slaConfRouter } from "./slaConfRouter.js";
const Router = express.Router();

Router.use("/sla-configure", slaConfRouter);

export default Router;
