import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const token = tokenFromHeader || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authotization = async (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      error:
        "Permission denied, only admins are allowed to perform this action.",
    });
  }
  next();
};
