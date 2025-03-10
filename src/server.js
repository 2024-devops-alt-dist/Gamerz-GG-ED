require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Route d'accueil
app.get("/", (req, res) => {
    res.send("🚀 API Gamerz fonctionne !");
});

// Route pour tester la connexion MongoDB
app.get("/test-db", async (req, res) => {
    try {
        res.status(200).send("✅ MongoDB est bien connecté !");
    } catch (error) {
        res.status(500).send({message: "❌ Erreur de connexion", error});
        console.log(res);
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🎮 Serveur démarré sur le port ${PORT}`));
