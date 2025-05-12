import app from "./src/app.js";
import http from "http";
import connectDB from "./src/config/database.js";
import connectWebsocket from "./src/config/websocket.js";

const port = 3500;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    connectWebsocket(server);

    server.listen(port, () => {
      console.log(`Servidor activo en http://localhost:${port}`);
    });
  } catch (error) {
    console.log("No se ha podido levantar el servidor", error);
    process.exit(1);
  }
};

startServer();
