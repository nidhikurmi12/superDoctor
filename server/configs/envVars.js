import dotenv from "dotenv";

dotenv.config();

const EnvVar = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  secure_key:process.env.SECURE_KEY
};

export default EnvVar;
