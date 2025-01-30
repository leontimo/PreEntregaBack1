import server from "./server/server.js";
import { Server } from "socket.io";
import products from "./db/products.json" assert { type: "json" };

const PORT = 8080;

// Configuracion del server -> Se delega -> server.jsnp

// WebSocket config
const app = server.listen(PORT, () =>
  console.log(`Server funcionando en el puerto ${PORT}`)
);

export const io = new Server(app);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.emit("init", products);
});
