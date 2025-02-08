const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Cambia esto si tu frontend usa otro puerto
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    console.log("🔔 Servicio de notificaciones iniciado.");

    io.on("connection", (socket) => {
        console.log("🟢 Cliente conectado:", socket.id);

        // Escuchar eventos desde el frontend
        socket.on("enviarNotificacion", (data) => {
            console.log("📢 Notificación recibida:", data.message);
            io.emit("notificacion", { message: data.message });
        });

        socket.on("disconnect", () => {
            console.log("🔴 Cliente desconectado:", socket.id);
        });
    });
};

// Función para emitir notificaciones a los clientes
const sendNotification = (message) => {
    if (io) {
        io.emit("notificacion", { message });
        console.log("📢 Notificación enviada:", message);
    }
};

module.exports = { initSocket, sendNotification };
