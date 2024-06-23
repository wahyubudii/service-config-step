import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import Router from "./routes/index.js";
import { logging } from "./config/logger.js";
import { dbConnect } from "./config/dbConfig.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const host = process.env.HOST;
const port = process.env.PORT || 3005;
const baseUrl = host + port;

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(logging);

// DATABASE
dbConnect();
// txNotifPg();
// notifyHandler();

// API ROUTE
app.use("/api/v1", Router);

// EXCEPTION FILTER
app.use(notFound);
app.use(errorHandler);

// LISTENER SERVER
app.listen(port, () => console.log(`Server running on ${baseUrl}`));
