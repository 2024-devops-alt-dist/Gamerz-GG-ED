require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Connexion à la bdd
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🎮 Serveur démarré sur le port ${PORT}`));
    })
    .catch((error) => {
        console.error("❌ Erreur lors de la connexion à MongoDB :", error.message);
        process.exit(1);
    });

// Middlewares
app.use(
    cors({
        origin: "http://localhost:5174",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("🚀 API Gamerz fonctionne !");
});

app.get("/test-db", async (req, res) => {
    try {
        res.status(200).send("✅ MongoDB est bien connecté !");
    } catch (error) {
        res.status(500).json({ message: "❌ Erreur de connexion", error: error.message });
    }
});

// Routes
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "❌ Route non trouvée" });
});
