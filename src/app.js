import express from "express";
import errorHandler from "./middlewares/errorMiddleware.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
const app = express();

dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Evitar conflictos CORS
app.use(cors());

// Protección en cabeceras y otros
app.use(helmet());

// Protección contra consultas maliciosas
app.use(mongoSanitize());

// Limitar peticiones por IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 peticiones por IP
  message: "Demasiadas peticiones desde esta IP",
});

app.use("/", apiLimiter);

// Rutas
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/events", eventRouter);

// Manejadores de errores
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
