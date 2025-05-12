import { WebSocketServer, WebSocket } from "ws";
import app from "../app.js";

function connectWebsocket(server) {
  const wss = new WebSocketServer({ server });
  const clientsMap = new Map();
  wss.on("connection", (ws) => {
    console.log("Nuevo cliente conectado vía WebSocket");
    ws.on("message", async (message) => {
      console.log("Mensaje recibido:", message.toString());
      try {
        const msg = JSON.parse(message.toString());
        if (msg.type === "identify") {
          const userId = msg.userId;
          clientsMap.set(userId, ws);
          ws.userId = userId;
          console.log(`Cliente identificado como ${userId}`);
        }
      } catch (err) {
        console.error("Mensaje inválido:", err);
      }
    });

    ws.on("close", () => {
      console.log("Cliente WebSocket desconectado");
      if (ws.userId) {
        clientsMap.delete(ws.userId);
        console.log(`Cliente ${ws.userId} desconectado`);
      }
    });
  });

  const notifyUser = (userId, event, data) => {
    const client = clientsMap.get(userId);

    if (client && client.readyState === WebSocket.OPEN) {
      console.log("Enviando notificación", userId);
      client.send(JSON.stringify({ event, data }));
    }
  };

  app.set("notify-user", notifyUser);
}

export default connectWebsocket;
