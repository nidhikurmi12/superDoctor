import EnvVar from "../configs/envVars.js";
import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { CREATED, FORBIDDEN } from "http-status-codes";
import Apiresponse from "../utils/response/responsehandler.js";
import bcrypt from "bcrypt";

export async function userRegister(req, res) {
  try {
    const { name, email, password, address } = req.body;
    console.log(req.body);
    if ([name, email, password].some((value) => value == "")) {
      return res
        .status(FORBIDDEN)
        .send(new Apiresponse("All fileds are require"));
    }
    const userPresent = await user.findOne({ email: email });
    if (userPresent) {
      return res.status(400).send({
        message: "User Already Present",
      });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);
    const userData = await user.create({
      name: name,
      email: email,
      password: hash,
      address: address,
    });
    return res
      .status(CREATED)
      .send(new Apiresponse("register successfully", true, userData));
  } catch (error) {
    console.log(error);
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const userPresent = await user.findOne({ email: email });
    if (!userPresent) {
      return res.status(200).send({
        message: "user not present",
      });
    }
    const matchPassword = bcrypt.compareSync(password, userPresent.password);
    if (!matchPassword) {
      return res.status(401).send({
        message: "password not match",
      });
    }

    const data = {
      id: userPresent._id,
      name: userPresent.name,
      email: userPresent.email,
    };
    const token = jwt.sign(data, EnvVar.secure_key, { expiresIn: "4d" });
    if (!token) {
      return res.status(400).send({
        message: "token not token",
      });
    }
    cookieParser("AccessToken", "Bearer " + token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    return res.status(201).send({
      message: "Login Successfull",
      data: data,
      accesstoken: token,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function verifyUser(req, res) {
  try {
    res.status(CREATED).send(new Apiresponse("user verified", true));
  } catch (error) {
    console.log(error);
  }
}
