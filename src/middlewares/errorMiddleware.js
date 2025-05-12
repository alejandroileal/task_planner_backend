const errorHandler = (error, request, response, next) => {
  response
    .status(500)
    .json({ succes: "NOK", message: "Error interno del servidor" });
};

export default errorHandler;
