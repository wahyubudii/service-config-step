import mongoose from "mongoose";
import pkg from "pg";
import { dbListener } from "../services/notify/index.js";

export const dbConnect = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        dbListener("izin_sla_created");
        dbListener("permohonan_izin_created");
        console.log(`Database Successfully Connected`);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Database error");
  }
};

// JODIE
const { Pool: PoolPg } = pkg;
export const poolPg = new PoolPg({
  connectionString: process.env.DATABASE_URL,
});
