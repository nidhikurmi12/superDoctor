import express from "express";
import morgan from "morgan";
import cors from "cors";
import EnvVar from "./configs/envVars.js";
import DbConn from "./db/db.js";
import cookieParser from "cookie-parser";
import allroutes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());

// Database Connection
DbConn();

// Routes
app.get("/", (req, res) => {
  return res.status(200).send({ message: "server is running in dev mode" });
});
app.use("/api/v1", allroutes);

// Export the app for serverless use
export default app;
