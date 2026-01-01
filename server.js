
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT|| 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
