import { body, param, validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const createEventValidations = [
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isString()
    .withMessage("El título debe ser un texto"),

  body("date")
    .notEmpty()
    .withMessage("La fecha es requerida")
    .isString()
    .withMessage("La fecha debe ser un texto"),

  body("time")
    .notEmpty()
    .withMessage("La hora es requerida")
    .isString()
    .withMessage("La hora debe ser un texto"),

  body("details")
    .optional()
    .isString()
    .withMessage("Los detalles deben ser un texto"),

  body("weatherData.temp")
    .optional()
    .isNumeric()
    .withMessage("La temperatura debe ser un número"),

  body("weatherData.temp_min")
    .optional()
    .isNumeric()
    .withMessage("La temperatura mínima debe ser un número"),

  body("weatherData.temp_max")
    .optional()
    .isNumeric()
    .withMessage("La temperatura máxima debe ser un número"),

  body("weatherData.description")
    .optional()
    .isString()
    .withMessage("La descripción del clima debe ser un texto"),

  body("weatherData.icon")
    .optional()
    .isString()
    .withMessage("El icono debe ser un texto"),

  body("owner")
    .optional()
    .isMongoId()
    .withMessage("El propietario debe ser un ID válido de MongoDB"),
  validateResult,
];

export const updateEventValidations = [
  param("eventId")
    .optional()
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB válido"),

  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isString()
    .withMessage("El título debe ser un texto"),

  body("date")
    .notEmpty()
    .withMessage("La fecha es requerida")
    .isString()
    .withMessage("La fecha debe ser un texto"),

  body("time")
    .notEmpty()
    .withMessage("La hora es requerida")
    .isString()
    .withMessage("La hora debe ser un texto"),

  body("details")
    .optional()
    .isString()
    .withMessage("Los detalles deben ser un texto"),

  body("weatherData.temp")
    .optional()
    .isNumeric()
    .withMessage("La temperatura debe ser un número"),

  body("weatherData.temp_min")
    .optional()
    .isNumeric()
    .withMessage("La temperatura mínima debe ser un número"),

  body("weatherData.temp_max")
    .optional()
    .isNumeric()
    .withMessage("La temperatura máxima debe ser un número"),

  body("weatherData.description")
    .optional()
    .isString()
    .withMessage("La descripción del clima debe ser un texto"),

  body("weatherData.icon")
    .optional()
    .isString()
    .withMessage("El icono debe ser un texto"),

  body("owner")
    .optional()
    .isMongoId()
    .withMessage("El propietario debe ser un ID válido de MongoDB"),
  validateResult,
];

export const deleteEventValidations = [
  param("eventId")
    .optional()
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB válido"),
  validateResult,
];
