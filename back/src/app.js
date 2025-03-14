require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const PORT_FRONT = process.env.PORT_FRONT;

const app = express();

// Middlewares
app.use(
    cors({
        origin: `http://localhost:${PORT_FRONT}`,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/test-db", async (req, res) => {
    res.status(200).send("✅ MongoDB est bien connecté !");
});

app.use((req, res) => {
    res.status(404).json({ message: "❌ Route non trouvée" });
});

module.exports = app;
