import multer from "multer";

import fileService from "../services/fileServices.js";

export async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No hay ningún archivo que subir" });
    }

    const filename = await fileService.uploadFile(req.file);
    // aquí manejar la lógica de la base de datos para subir el nombre del archivo
    res.status(201).json({ message: "Archivo subido exitosamente", filename });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).json({ error: "Error al subir el archivo" });
  }
}
