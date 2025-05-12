import { body, param, validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const loginUserValidation = [
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isString()
    .withMessage("El email debe ser texto"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isString()
    .withMessage("La contraseña debe ser texto"),
  validateResult,
];

const registerUserValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre debe ser texto"),

  body("lastName")
    .notEmpty()
    .withMessage("El apellido es requerido")
    .isString()
    .withMessage("El apellido debe ser texto"),

  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isString()
    .withMessage("El email debe ser texto"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isString()
    .withMessage("La contraseña debe ser texto"),
  validateResult,
];

export { loginUserValidation, registerUserValidation };
