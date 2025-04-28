import bcrypt from "bcrypt";
import { createUser, login } from "../services/userServices.js";
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
        console.log(error);
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
        res.status(200).json({ success: "ok", loginData });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: "nok", error: "Cannot login" });
      }
    },
  ],
};
