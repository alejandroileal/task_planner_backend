import app from "./src/app.js";
import connectDB from "./src/config/database.js";

const port = 3500;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Servidor activo en http://localhost:${port}`);
    });
  } catch (error) {
    console.log("No se ha podido levantar el servidor", error);
    process.exit(1);
  }
};

startServer();
