import express from "express";
import morgan from "morgan";
import cors from "cors";
import EnvVar from "./configs/envVars.js";

import DbConn from "./db/db.js";
import cookieParser from "cookie-parser";
import allroutes from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
const port = EnvVar.port;
DbConn();

app.use("/api/v1", allroutes);

app.listen(port, () => {
  console.log("server running on ports", port);
});
