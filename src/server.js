require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Routes de test
app.get("/", (req, res) => {
    res.send("🚀 API Gamerz fonctionne !");
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🎮 Serveur démarré sur le port ${PORT}`));
