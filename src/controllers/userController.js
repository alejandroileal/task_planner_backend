import bcrypt from "bcrypt";
import { createUser, getUser, login } from "../services/userServices.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validations/userValidations.js";

export const userController = {
  registerUser: [
    ...registerUserValidation,
    async (req, res) => {
      try {
        const { firstName, lastName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const registerResponse = await createUser({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        res.status(201).json({ success: "ok", registerResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot register user" });
      }
    },
  ],
  loginUser: [
    ...loginUserValidation,
    async (req, res) => {
      try {
        const { email, password } = req.body;
        const loginData = await login(email, password);

        res.cookie("token", loginData.token, {
          // httpOnly: true,
          secure: false,
          // sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ success: "ok", loginData });
      } catch (error) {
        res.status(500).json({ success: "nok", error: error.message });
      }
    },
  ],
  getProfile: [
    async (req, res) => {
      try {
        const getProfileResponse = await getUser(req.userId);
        res.status(201).json({ success: "ok", user: getProfileResponse });
      } catch (error) {
        res.status(500).json({ success: "nok", error: "Cannot get user" });
      }
    },
  ],
};
