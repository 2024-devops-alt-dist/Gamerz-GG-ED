const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🎮 Serveur démarré sur le port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Erreur lors de la connexion à MongoDB :", error.message);
        process.exit(1);
    });
