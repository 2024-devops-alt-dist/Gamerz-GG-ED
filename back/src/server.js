const app = require("./app");
const connectDB = require("./config/database");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./socketHandler");

const PORT = process.env.PORT || 5001;

const allowedOrigins = [
    `http://localhost:${process.env.PORT_FRONT}`,
    'https://gamerz-gg-ed.vercel.app'
];

connectDB()
    .then(() => {
        const server = http.createServer(app);

        const io = new Server(server, {
            cors: {
                origin: function (origin, callback) {
                    if (!origin || allowedOrigins.includes(origin)) {
                        callback(null, true);
                    } else {
                        callback(new Error(`Socket.IO CORS policy: Origin ${origin} not allowed`));
                    }
                },
                credentials: true,
            },
        });

        socketHandler(io);

        server.listen(PORT, () => {
            console.log(`🎮 Serveur démarré sur le port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Erreur lors de la connexion à MongoDB :", error.message);
        process.exit(1);
    });
