import express from "express";
import errorHandler from "./middlewares/errorMiddleware.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import { authenticate } from "./middlewares/authMiddleware.js";
import fileRouter from "./routes/fileRoutes.js";

const app = express();

dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Habilita cookies
app.use(cookieParser());

// Evitar conflictos CORS
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

// Protección en cabeceras y otros
app.use(helmet());

// Protección contra consultas maliciosas
app.use(mongoSanitize());

//Limitar peticiones por IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Demasiadas peticiones desde esta IP",
});

app.use("/", apiLimiter);

app.use("/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/users", userRouter);
app.use("/tasks", authenticate, taskRouter);
app.use("/events", authenticate, eventRouter);
app.use("/files", fileRouter);

// Manejadores de errores
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
