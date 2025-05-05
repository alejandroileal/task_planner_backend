import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "You need a token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    req.body.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const authotization = async (req, res, next) => {
  if (req.body.userRole !== "admin") {
    return res.status(403).json({
      error:
        "Permission denied, only admins are allowed to perform this action.",
    });
  }
  next();
};
