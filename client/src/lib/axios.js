import axios from "axios";
import EnvVars from "../configs/EnvVars";

const Request = axios.create({
  baseURL: EnvVars.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Request;
