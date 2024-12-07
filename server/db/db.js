import mongoose from "mongoose";
import EnvVar from "../configs/envVars.js";

const DbConn = async () => {
  try {
    const connection = await mongoose.connect(EnvVar.mongo_url);
    if (connection) {
      console.log("database connected successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default DbConn;
