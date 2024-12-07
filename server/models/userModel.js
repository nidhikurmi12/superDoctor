import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    address: {
      type: String,
    },
   
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
export default user;
