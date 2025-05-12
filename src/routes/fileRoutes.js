import express from "express";
import { uploadFile } from "../controllers/fileController.js";
import { upload } from "../middlewares/fileInterceptor.js";

const fileRouter = express.Router();

fileRouter.post("/upload", upload.single("file"), uploadFile);

export default fileRouter;
