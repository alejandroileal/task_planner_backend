import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "./emailService.js";

export async function createUser(user) {
  try {
    const newUser = new User(user);
    const response = await newUser.save();
    await sendWelcomeEmail({
      name: newUser.firstName,
      email: newUser.email,
    });

    const token = jwt.sign(
      { id: response.id, role: response.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "90d",
      }
    );

    return { newUser: response, token };
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Incorrect password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "90d",
      }
    );

    return { token, user };
  } catch (error) {
    throw error;
  }
}

export async function getUser(userId) {
  try {
    console.log(userId);
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (error) {
    throw error;
  }
}
