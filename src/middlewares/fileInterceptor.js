import multer from "multer";

const allowedTypes = ["image/jpeg", "image/png"];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Aceptar archivo
    } else {
      cb(new Error("Formato no permitido. Solo JPG o PNG."), false);
    }
  },
});
