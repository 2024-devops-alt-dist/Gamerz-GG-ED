require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");


const app = express();

const allowedOrigins = [
    `http://localhost:${process.env.PORT_FRONT}`,
    'https://gamerz-gg-ed.vercel.app'
];

// Middleware
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS policy: Origin ${origin} not allowed`));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

app.get("/test-db", async (req, res) => {
    res.status(200).send("✅ MongoDB est bien connecté !");
});

app.use((req, res) => {
    res.status(404).json({message: "❌ Route non trouvée"});
});

module.exports = app;
