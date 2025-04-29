import { body, param, validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const createTaskValidations = [
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isString()
    .withMessage("El título debe ser un texto"),

  body("description")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isString()
    .withMessage("La descripción debe ser un texto"),

  body("dueDate")
    .notEmpty()
    .withMessage("La fecha de vencimiento es requerida")
    .isISO8601()
    .withMessage("La fecha de vencimiento debe tener formato de fecha válida"),

  body("status")
    .optional()
    .isIn(["pendiente", "en proceso", "completada"])
    .withMessage("El estado debe ser 'pendiente', 'en proceso' o 'completada'"),

  body("owner")
    .optional()
    .isMongoId()
    .withMessage("El propietario debe ser un ID válido de MongoDB"),
  validateResult,
];

export const updateTaskValidations = [
  param("taskId")
    .optional()
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB válido"),

  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isString()
    .withMessage("El título debe ser un texto"),

  body("description")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isString()
    .withMessage("La descripción debe ser un texto"),

  body("dueDate")
    .notEmpty()
    .withMessage("La fecha de vencimiento es requerida")
    .isISO8601()
    .withMessage("La fecha de vencimiento debe tener formato de fecha válida"),

  body("status")
    .optional()
    .isIn(["pendiente", "en proceso", "completada"])
    .withMessage("El estado debe ser 'pendiente', 'en proceso' o 'completada'"),

  body("owner")
    .optional()
    .isMongoId()
    .withMessage("El propietario debe ser un ID válido de MongoDB"),
  validateResult,
];

export const deleteTaskValidations = [
  param("taskId")
    .optional()
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB válido"),
  validateResult,
];
